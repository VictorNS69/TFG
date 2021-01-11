# Bachelor's Degree Final Project (Trabajo de Fin de Grado)

## Author

[Víctor Nieves Sánchez](https://github.com/VictorNS69)

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

## Generate the file

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
