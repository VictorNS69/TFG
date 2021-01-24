# Alastria Blockchain Ecosystem. Security and privacy in Self-Sovereign Identity
This repository contains my thesis (final-year project) for the Computer Engineering bachelor degree at the [Universidad Politécnica de Madrid](http://www.upm.es/internacional).

## Author
[Víctor Nieves Sánchez](https://www.linkedin.com/in/victor-nieves-s%C3%A1nchez/)

## Abstract
In the technology industry, cybersecurity is very important.  Companies are increasingly focused on ensuring that their various applications, projects and services are secure.  They are even starting to adapt their solutions to technologies that guarantee greater security and robustness, such as Blockchian technology.

On the other hand, companies must protect the information security, guaranteeing the confidentiality, availability and integrity of the information. This problem is often linked to data protection regulations, such as the GDPR, which is why the idea of a Self-Sovereign Identity is becoming increasingly popular. Self-
Sovereign Identity (SSI) is the concept that individuals or organizations have the sole and exclusive ownership of their digital identities, and are the ones who control how their personal data is shared and used.

Alastria, a consortium promoting the digital economy through the development of decentralized registration technologies such as Blockchain, has defined a digital identity model called _Alastria ID_. The _Alastria ID_ project is deployed as one of the basic applications of the blockchain infrastructure promoted by the consortium within its platform.  This technological proposal of digital identity in blockchain aims to provide an infrastructure and development framework to carry out SSI projects, with full legal validity in the euro area.

The fact that a company uses Blockchain technology does not mean that it is free of security problems and vulnerabilities.  As these are new technologies, there are still not many standards, there are no robust implementations, and a small failure can cause a security gap, and the impact this can have on a Self-
Sovereign Identity model can be critical to the ecosystem.

The objective of this work is multiple. The concept of SSI has been studied, as well as the implementation of Alastria called _Alastria ID_ and other implementations and solutions that exist today. On the other hand, a study of the _Alastria ID_ implementation has been carried out from the point of view of security, auditing the Smart Contracts designed in the MVP1 and the library that facilitates its use. Finally, a Prove Of Concept has been created for one of the vulnerabilities found during the analysis phase and its criticality and impact has been evaluated.

**Keywords**: Blockchain, Alastria, Self-
Sovereign Identity, Ethereum, Quorum, Solidity, Smart Contracts, Hacking, Cybersecurity, Information Security, Audit...

## Requirements
1. Install **_LaTex_**.
```bash
sudo apt install texlive-full
```
2. Install the **_pgf-pie_** package.
First, you need to download the _.zip_ from: http://mirror.ctan.org/graphics/pgf/contrib/pgf-pie.zip, then:
```bash
unzip pgf-pie.zip
mkdir -p ~/texmf/tex/latex/pgf-pie
cp pgf-pie/pgf-pie.sty ~/texmf/tex/latex/pgf-pie/
mkdir -p ~/texmf/doc/latex/pgf-pie
cp pgf-pie/pgf-pie-manual.pdf ~/texmf/doc/latex/pgf-pie/
```

## Generate the PDF file
Just run the _Makefile_ with:

```bash
make
```
More info:
```bash
This Makefile generates the file TFG_VICTOR_NIEVES_SANCHEZ.pdf.
Author: Víctor Nieves Sánchez
Mail: vnievess@gmail.com

help:			Show this help.
compile: 		Compiles the main .tex.
generate_bibliography:	Generates the bibliography. 
generate_glossary:	Generates the glossary and the list of acronyms.
recompile_and_rename:	Recompiles the .text and renames the PDF file.
clean:			Clean output files.
```
