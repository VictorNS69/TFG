// Alastria Identity Lib dependency
const {
  transactionFactory,
  UserIdentity,
  tokensFactory
} = require('alastria-identity-lib')
// Web3 dependency
const Web3 = require('web3')
// File System dependency
const fs = require('fs')
// Keythereum dependency
const keythereum = require('keythereum')

// Read the config
const rawdata = fs.readFileSync('./config.json')
const config = JSON.parse(rawdata)

// Web3 configuration
const web3 = new Web3(new Web3.providers.HttpProvider(config.node))

// Set up the entity EOA
const entitykeystore = JSON.parse(fs.readFileSync(
  './keystores/entity.json'
))
let entityPrivateKey
try {
  entityPrivateKey = keythereum.recover(
    config.accountPwd,
    entitykeystore
  )
} catch (error) {
  console.error('ERROR: ', error)
}
// Set up the entity Identity
const entityIdentity = new UserIdentity(
  web3,
  `0x${entitykeystore.address}`,
  entityPrivateKey
)

/** Returns a new credential
 */
function createCredential() {
  // Steps to create a Credential

  // 1) Create the Credential object (a JWT)
  const credential = tokensFactory.tokens.createCredential(
    config.entity,
    null,
    {
      "name": "Victor Nieves",
      "email": "vnievess@gmail.com",
      "levelOfAssurance": "0"
    },
    config.entity + "#keys-1",
    "did:ala:quor:redt:12eeaCCA9eEbB78eB97d7cac6b"
  )
  console.log(`The credential is:\n${JSON.stringify(credential, null, 4)}`)

  // 2) Sign the JWT
  const signedCredential = tokensFactory.tokens.signJWT(
    credential,
    entityPrivateKey
  )
  console.log(`\nThe signed credential is:\n\t ${signedCredential}`)

  // 3) Create the PSMHash (from the Issuer part)
  const psmHash = tokensFactory.tokens.PSMHash(
    web3,
    signedCredential,
    config.entity
  )
  console.log(`\nThe Credential PSMHash is:\n\t${psmHash}`)
  return psmHash
}

/** Sends a signed transaction to the blockchain
 * @param {string} signedTx a signed transaction
 */
function sendSignedTx(signedTx) {
  return new Promise((resolve, reject) => {
    web3.eth.sendSignedTransaction(signedTx)
      .on('transactionHash', function (hash) {
        console.log(`\nThe transaction hash is:\n ${hash}`)
      })
      .on('receipt', (receipt) => {
        //console.log(`The receipt is:\n\t${JSON.stringify(receipt, null, 4)}`)
        resolve(receipt)
      })
      .on('error', (error) => {
        console.error('ERROR:', error)
        reject(error)
      })
  })
}

async function main() {
  // Steps to issue a credential

  // 1) Create the credential
  const psmHash = createCredential()

  // 2) Create the blockchain transaction
  const tx = transactionFactory.credentialRegistry.addIssuerCredential(
    web3,
    psmHash
  )
  //console.log(console.log(`addIssuerCredential transaction\n${JSON.stringify(tx, null, 4)}`))

  // 3) Sign the transaction
  const signedTx = await entityIdentity.getKnownTransaction(tx)

  // 4) Send the signed transaction to the blockchain
  sendSignedTx(signedTx).then(() => {
    const getStatusTx = transactionFactory.credentialRegistry.getIssuerCredentialStatus(
      web3,
      config.entity,
      psmHash
    )
    // Additional step to verify the status of the credential
    web3.eth.call(getStatusTx)
      .then((status) => {
        const result = web3.eth.abi.decodeParameters(
          ['bool', 'uint8'],
          status
        )
        const credentialStatus = {
          exists: result[0],
          status: result[1]
        }
        console.log(`\nCredential status:\n\t${JSON.stringify(credentialStatus)}`)
      })
  })
}

main()