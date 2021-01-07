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

// Set up the attacker EOA
const attackerkeystore = JSON.parse(fs.readFileSync(
  './keystores/attacker.json'
))
let attackerPrivateKey
try {
  attackerPrivateKey = keythereum.recover(
    config.accountPwd,
    attackerkeystore
  )
} catch (error) {
  console.error('ERROR: ', error)
}
// Set up the attacker Identity
const attackerIdentity = new UserIdentity(
  web3,
  `0x${attackerkeystore.address}`,
  attackerPrivateKey
)
async function main() {
  const tx = await transactionFactory.identityManager.deleteIdentityIssuer(
    web3,
    config.entity
  )
  //console.log(console.log(`deleteIdentityIssuer transaction\n${JSON.stringify(tx, null, 4)}`))

  const signedTx = await attackerIdentity.getKnownTransaction(tx)

  web3.eth.sendSignedTransaction(signedTx)
    .on('transactionHash', function (hash) {
      console.log(`The transaction hash is:\n ${hash}`)
    })
    .on('receipt', function (receipt) {
      //console.log(`\nThe receipt is:\n\t${JSON.stringify(receipt, null, 4)}`)
    })
    .on('error', function (error) {
      console.error('ERROR:', error)
    })
}
main()