// Alastria Identity Lib dependency
const {
    transactionFactory,
    UserIdentity,
    tokensFactory,
    config
} = require('alastria-identity-lib')
// Web3 dependency
const Web3 = require('web3')
// File System dependency
const fs = require('fs')
// Keythereum dependency
const keythereum = require('keythereum')

// Read the config
const rawdata = fs.readFileSync('./config.json')
const configData = JSON.parse(rawdata)

// Web3 configuration
const web3 = new Web3(new Web3.providers.HttpProvider(configData.node))

// Set up the entity EOA
const entitykeystore = JSON.parse(fs.readFileSync(
    './keystores/entity.json'
))
let entityPrivateKey
try {
    entityPrivateKey = keythereum.recover(
        configData.accountPwd,
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

// Set up the subject EOA
const subjectkeystore = JSON.parse(fs.readFileSync(
    './keystores/subject.json'
))
let subjectPrivateKey
try {
    subjectPrivateKey = keythereum.recover(
        configData.accountPwd,
        subjectkeystore
    )
} catch (error) {
    console.error('ERROR: ', error)
}
// Set up the subject Identity
const subjectIdentity = new UserIdentity(
    web3,
    `0x${subjectkeystore.address}`,
    subjectPrivateKey
)

/** Creates the prepareAlastriaID transaction
 */
function preparedAlastriaId() {
    return transactionFactory.identityManager.prepareAlastriaID(
        web3,
        subjectIdentity.address
    )
}

/** Creates the createAlastriaIdentity transaction
 */
function createAlastriaId() {
    return transactionFactory.identityManager.createAlastriaIdentity(
        web3,
        configData.subjectPublicKey.substr(2)
    )
}

async function main() {
    // Steps to create a new identity (DID)
    // 1) Create the createAlastriaIdentity transaction
    const createTx = await createAlastriaId()
    // 2) Sign the createAlastriaIdentity transaction 
    // (the Subject (EOA of the new DID) signs it)
    const signedCreateTx = await subjectIdentity.getKnownTransaction(
        createTx
    )
    // 3) Create the prepareAlastriaID transacttion
    const prepareTx = await preparedAlastriaId()
    // 4) Sign the prepareAlastriaID transaction 
    // (the Issuer (EOA of the entity) signs it)
    const signedPrepareTx = await entityIdentity.getKnownTransaction(
        prepareTx
    )
    // The order in steps 1-4 is not important

    // 5) Send the signed prepare transaction
    web3.eth.sendSignedTransaction(signedPrepareTx)
        .on('transactionHash', function (hash) {
            console.log(`\nThe prepare transaction hash is:\n ${hash}`)
        })
        .on('receipt', function (receipt) {
            //console.log(`The repare receipt is:\n\t${JSON.stringify(receipt, null, 4)}`)

            // 5) When we have the prepare receipt, we send the 
            // signed createAlastriaIdentity transaction
            // It is very important to verify that transaction 5 will be mined first and then 6, 
            // since otherwise the flow will not work
            web3.eth.sendSignedTransaction(signedCreateTx)
                .on('transactionHash', function (hash) {
                    console.log(`\nThe create transaction hash is:\n ${hash}`)
                })
                .on('receipt', function (receipt) {
                    //console.log(`The create receipt is:\n\t${JSON.stringify(receipt, null, 4)}`)

                    // 6) Call to identityKeys to obtain the new Proxy Addres generated
                    web3.eth.call({
                        to: config.alastriaIdentityManager,
                        data: web3.eth.abi.encodeFunctionCall(
                            config.contractsAbi.AlastriaIdentityManager.identityKeys,
                            [subjectkeystore.address]
                        )
                    }).then((AlastriaIdentity) => {
                        // 7) Generate the DID
                        const alastriaDID = tokensFactory.tokens.createDID(
                            "quor",
                            AlastriaIdentity.slice(26),
                            "redT"
                        )
                        console.log(`\nNew DID created:\n\t${alastriaDID}`)
                    })
                })
                .on('error', function (error) {
                    console.error('ERROR create:', error)
                })
        })
        .on('error', function (error) {
            console.error('ERROR prepare:', error)
        })
}

main()