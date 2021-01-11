MAIN_FILE=Main
FINAL_NAME=TFG_VICTOR_NIEVES_SANCHEZ.pdf


default: compile generate_bibliography generate_glossary recompile_and_rename clean

help:			## Show this help.
			@echo This Makefile generates the file $(FINAL_NAME).
			@echo Author: Víctor Nieves Sánchez
			@echo Mail: vnievess@gmail.com
			@echo
			@sed -ne '/@sed/!s/## //p' $(MAKEFILE_LIST)

compile: 		## Compiles the main .tex.
			@echo Compile .tex.
			pdflatex $(MAIN_FILE).tex 2>&1 > /dev/null

generate_bibliography:	## Generates the bibliography.
			@echo Generate the bibliography.
			bibtex $(MAIN_FILE).aux 2>&1 > /dev/null

generate_glossary:	## Generates the glossary and the list of acronyms.
	 		@echo Generate glossary.
			makeglossaries -q $(MAIN_FILE) 2>&1 > /dev/null

recompile_and_rename:	## Recompiles the .text and renames the PDF file.
			@echo Recompile file.
			pdflatex $(MAIN_FILE).tex 2>&1 > /dev/null
			@echo Rename final file.
			mv $(MAIN_FILE).pdf $(FINAL_NAME)

clean:			## Clean output files.
			@echo Removes compiled files.
			rm -f Main.aux Main.glo  Main.lol Main.toc Main.bbl Main.gls Main.lot Main.acn  Main.blg Main.ist Main.out Main.acr Main-blx.bib Main.lof Main.run.xml Main.alg  Main.glg Main.log Main.fls Main.fdb_latexmk

