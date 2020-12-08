FILE=Main.tex  # path to your TeX file 

default: compile rename clean

compile: ## Compile paper
	 rubber --pdf $(FILE)

rename:	 ## Renmae output file
	 mv Main.pdf "TFG_VICTOR_NIEVES_SANCHEZ.pdf"

clean:   ## Clean output files
	 rubber --clean $(FILE)

	
