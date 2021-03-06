#!/usr/bin/env node

/* eslint-env node */
'use strict';

const fs = require('fs'),
  path = require('path'),
  xml2js = require('xml2js'),
  Paper = require('conftooljs').Paper;

var program = require('commander'),
  activeProcessors = [];

function parseProcessorList(list) {
  return list.replace(' ', '').split(',');
}

program
  .version('0.0.1')
  .option('-i, --input [value]', 'Input file', 'submissions.xml')
  .option('-a, --accepted', 'Process and export only accepted papers')
  .option('-o, --output [value]', 'Output file', 'out.xml')
  .option('-d --directory [value]', 'Directory where processors are stored', '/processors')
  .option('-p, --processors <values>', 'A comma seperated list of PaperProcessors used to transform the imported xml data', parseProcessorList)
  .parse(process.argv);

function log(msg) {
  console.log(msg); // eslint-disable-line
}

function onError(error) {
  if (error) {
    log(error);
  }
}

function printPapers(papers) {
  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<papers>\n';
  for (let i = 0; i < papers.length; i++) {
    let paper = papers[i];
    xml += paper.toXML();
  }
  xml += '</papers>';
  fs.writeFileSync(program.output, xml);
}

function processPaper(paper) {
  var processedPaper;
  for (let i = 0; i < activeProcessors.length; i++) {
    let processor = activeProcessors[i];
    processedPaper = processor.process(paper);
  }
  return processedPaper;
}

function filterPapers(papers){
  if(!program.accepted) {
    return papers;
  }
  return papers.filter(function(paper){
    return paper.isAccepted;
  });
}

function onPapersExtracted(papers) {
  return new Promise(function(resolve) {
    let filteredPapers = filterPapers(papers);
    for (let i = 0; i < filteredPapers.length; i++) {
      filteredPapers[i] = processPaper(filteredPapers[i]);
    }
    resolve(filteredPapers);
  });
}

function loadProcessor(processor) {
  try {
    // TODO: Fix loading path
    let PaperProcessor = require('./' + processor);
    activeProcessors.push(new PaperProcessor());
  } catch (error) {
    log(error);
  }
}

function loadSelectedProcessors(processors, pathToProcessors) {
  return new Promise(function(resolve) {
    for (let i = 0; i < processors.length; i++) {
      let processor = path.join(pathToProcessors, (processors[i] + '.js'));
      loadProcessor(processor);
    }
    resolve();
  });
}

function extractPapersFromXML(file) {
  var parser = new xml2js.Parser({ explicitArray: false });
  return new Promise(function(resolve) {
    fs.readFile(file, function(err, data) {
      parser.parseString(data, function(err, result) {
        let papers = [];
        for (let i = 0; i < result.papers.paper.length; i++) {
          papers.push(Paper.fromConfTool(result.papers.paper[i]));
        }
        resolve(papers);
      });
    });
  });
}

(function run() {
  var file = program.input,
    processors = program.processors,
    pathToProcessors = program.directory;
  loadSelectedProcessors(processors, pathToProcessors).then(extractPapersFromXML.bind(this, file)).then(onPapersExtracted, onError).then(printPapers).catch(onError);
}());
