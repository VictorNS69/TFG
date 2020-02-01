FILE=Main.tex  # path to your TeX file 

default: compile clean

compile: ## Compile paper
	 rubber --pdf $(FILE)

clean:  ## Clean output files
	rubber --clean $(FILE)

	
