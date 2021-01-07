// Alastria Identity Lib dependency (only transaction factory)
const { transactionFactory } = require('alastria-identity-lib')
// Web3 dependency
const Web3 = require('web3')
// File System dependency
const fs = require('fs')

// Read the config
const rawdata = fs.readFileSync('./config.json')
const config = JSON.parse(rawdata)

// Web3 configuration
const web3 = new Web3(new Web3.providers.HttpProvider(config.node))

// Steps to verify if an entity is an Issuer

// 1) Create the transaction
let isIssuerTx = transactionFactory.identityManager.isIdentityIssuer(
    web3,
    config.entity
)
//console.log(`isIdentityIssuer transaction\n${JSON.stringify(isIssuerTx, null, 4)}`)
// 2) As it is a "call" transaction, the signature is not necessary. 
// We send it directly to the blockchain
web3.eth.call(isIssuerTx).then((status) => {
    const result = web3.eth.abi.decodeParameter('bool', status)
    console.log(`Is the entity (${config.entity}) an Issuer?\n\t${result}`)
})

// Also ask if the attacker is an issuer
isIssuerTx = transactionFactory.identityManager.isIdentityIssuer(
    web3,
    config.attacker
)

web3.eth.call(isIssuerTx).then((status) => {
    const result = web3.eth.abi.decodeParameter('bool', status)
    console.log(`Is the attacker (${config.attacker}) an Issuer?\n\t${result}`)
})