MAIN_FILE=Main
FINAL_NAME=TFG_VICTOR_NIEVES_SANCHEZ.pdf

leftparen:=(
rightparen:=)


default: compile generate_bibliography generate_glossary recompile_and_rename

compile: 		## Compile
			@echo Compile
			pdflatex $(MAIN_FILE).tex 2>&1 > /dev/null

generate_bibliography:	## Generate bibliography 
			@echo Generate bibliography
			bibtex $(MAIN_FILE).aux 2>&1 > /dev/null

generate_glossary:	## Generate glossary
	 		@echo Generate glossary
			makeglossaries -q $(MAIN_FILE) 2>&1 > /dev/null

recompile_and_rename:	## Renmae output file
			@echo Recompile file
			pdflatex $(MAIN_FILE).tex 2>&1 > /dev/null
			@echo Rename final file
			mv $(MAIN_FILE).pdf "TFG_VICTOR_NIEVES_SANCHEZ.pdf"

clean:			## Clean output files
			@echo Remove compiled files
			rm !("Main.tex"|"Bibliography.bib"|"Acronyms.tex"|"cover.sty"|"Makefile"|"README.md")

