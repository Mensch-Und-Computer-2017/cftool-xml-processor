/* eslint-env node */
'use strict';

const PaperProcessor = require('../lib/PaperProcessor.js'),
  MCI_FULL_PAPER_INDICATOR = 'MCI: Full Paper',
  MCI_SHORT_PAPER_INDICTOR = 'MCI: Short Paper (Poster)',
  MCI_TUTORIAL_INDICATOR = 'MCI: Tutorial',
  MCI_WORKSHOP_INDICATOR = 'MCI-WS',
  MCI_DEMO_INDIACTOR = 'MCI: Interactive Demos',
  UPA_FULL_PAPER_INDICATOR = 'UP: Full Presentation (30 min.)',
  UPA_SHORT_PAPER_INDICATOR = 'UP: Creative Presentation (15/30 min.)',
  UPA_WORKSHOP_INDICTOR = 'UP: Workshop/Panel-Discussion (90 min.',
  UPA_TUTORIAL_INDICTOR = 'UP: Tutorial (90 min.; half day; full day)',
  UPA_YOUNG_PROFESSIONALS_INDICATOR = 'UP: Young Professionals (15 min.)',
  UPA_USABILITY_CHALLENGE_INDICATOR = 'Usability Challenge';

class SessionProcessor extends PaperProcessor {

  process(paper) {
    var type = paper.type;
    paper.isMCIFullpaper = false;
    paper.addPropertyToExport('isMCIFullpaper');
    paper.isMCIShortpaper = false;
    paper.addPropertyToExport('isMCIShortpaper');
    paper.isMCITutorial = false;
    paper.addPropertyToExport('isMCITutorial');
    paper.isMCIWorkshop = false;
    paper.addPropertyToExport('isMCIWorkshop');
    paper.isMCIDemo = false;
    paper.addPropertyToExport('isMCIDemo');
    paper.isUPAFullPaper = false;
    paper.addPropertyToExport('isUPAFullPaper');
    paper.isUPAShortPaper = false;
    paper.addPropertyToExport('isUPAShortPaper');
    paper.isUPAWorkshop = false;
    paper.addPropertyToExport('isUPAWorkshop');
    paper.isUPATutorial = false;
    paper.addPropertyToExport('isUPATutorial');
    paper.isUPAYoungProfessionals = false;
    paper.addPropertyToExport('isUPAYoungProfessionals');
    paper.isUPAUsabilityChallenge = false;
    paper.addPropertyToExport('isUPAUsabilityChallenge');
    if (paper.type === '') {
      return paper;
    }

    if (type === MCI_FULL_PAPER_INDICATOR) {
      paper.isMCIFullpaper = true;
      return paper;
    }
    if (type === MCI_SHORT_PAPER_INDICTOR) {
      paper.isMCIShortpaper = true;
      return paper;
    }
    if (type === MCI_TUTORIAL_INDICATOR) {
      paper.isMCITutorial = true;
      return paper;
    }
    if (type.startsWith(MCI_WORKSHOP_INDICATOR)) {
      paper.isMCIWorkshop = true;
      paper.session.workshopId = parseInt(paper.session.shortTitle.replace('MCI-WS', ''), 10);
      return paper;
    }
    if (type === MCI_DEMO_INDIACTOR) {
      paper.isMCIDemo = true;
      return paper;
    }
    if (type === UPA_FULL_PAPER_INDICATOR) {
      paper.isUPAFullPaper = true;
      return paper;
    }
    if (type === UPA_SHORT_PAPER_INDICATOR) {
      paper.isUPAShortPaper = true;
      return paper;
    }
    if (type === UPA_WORKSHOP_INDICTOR) {
      paper.isUPAWorkshop = true;
      return paper;
    }
    if (type === UPA_TUTORIAL_INDICTOR) {
      paper.isUPATutorial = true;
      return paper;
    }
    if (type === UPA_YOUNG_PROFESSIONALS_INDICATOR) {
      paper.isUPAYoungProfessionals = true;
      return paper;
    }
    if (type === UPA_USABILITY_CHALLENGE_INDICATOR) {
      paper.isUPAUsabilityChallenge = true;
      return paper;
    }
    return paper;
  }
}

module.exports = SessionProcessor;