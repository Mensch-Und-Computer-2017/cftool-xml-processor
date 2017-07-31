# A node.js cli tool to process xml data from ConfTool

This tool is used to run exported ConfTool submission data through a number of custom processors to modify, add or remove information. A typical use case would be the creation of publication IDs based on paper information. Processing can be customized by extending the basic `lib/PaperProcessor.js`.

## Install

* Make sure Node.js (> 6.0) is installed.
* Clone repository and run `npm install`.

## Create Processors

Custom processors must extend `PaperProcessor` and provide a `process` function. Each paper is passed to this function. Modify and return the paper. When adding new properties to the paper object make sure to call `Paper.addPropertyToExport(property)`. Otherwise the new property will not be included in the final export. 

### Example

```
class DOIProcessor extends PaperProcessor {

  process(paper) {
    paper.doi = 42;
    paper.addPropertyToExport('doi');
    return paper;
  }

}
```

## Process data

Run `./process.js` to process data from your ConfTool export. 

### Examples

Load multiple processors from a folder called `myprocessors`, process papers from `myconference.xml` and export results to `results.xml`. Processors will be applied in given order.

`./process.js -i myconference.xml -o results.xml -d myprocessors -p ProcessorA,ProcessorB`

### Options

| Option					| Description				| Default Value		| Allowed Values 								|
|---------------------------|---------------------------|-------------------|-----------------------------------------------|
| -V, --version         	| output the version number |					|		 										|
| -i, --input [value]   	| Input file 				| submissions.xml 	| String 										|	
| -a, --accepted		   	| Process and export accepted papers only | 	| String 										|	
| -o, --output [value]  	| Outputfile		 		| out 				| String										|
| -d, --directory [value]  	| Directory with Processors | processors		| String										|
| -p, --processors [value] 	| A comma seperated list of Processors | 		| String										|
| -h, --help            	| output usage information  |					|												|
