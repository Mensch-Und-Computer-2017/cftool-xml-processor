/* eslint-env node */
'use strict';

const PaperProcessor = require('../lib/PaperProcessor.js'),
  fs = require('fs'),
  xml2js = require('xml2js'),
  PATH_TO_SESSION_FILE = './sessions.xml',
  WORKSHOP_INDICATOR = 'MCI-WS',
  DEMO_INDICATOR = 'UP-PD',
  UPA_INDICTOR = 'UP',
  MCI_INDICATOR = 'MCI';

var sessionData;

class SessionData {
  constructor(data) {
    this.sessions = data;
  }

  getSessionById(id) {
    return this.getSessionByAttribute('session_ID', id);
  }

  getSessionByAttribute(attribute, value) {
    var target = this.sessions.find(function(session) {
      return session[attribute][0] === value;
    });
    return target;
  }
}

class SessionProcessor extends PaperProcessor {

  getSessionData() {
    if (sessionData === undefined) {
      let parser = new xml2js.Parser(),
        file = fs.readFileSync(PATH_TO_SESSION_FILE);
      // Note: parseString works synchronous but the library does not provide a non-callback interface  
      parser.parseString(file, function(error, result) {
        sessionData = new SessionData(result.sessions.session);
      });
    }
    return sessionData;
  }

  process(paper) {
    var sessions = this.getSessionData(),
      session = sessions.getSessionById(paper.session.id);
    if (session) {
      paper.session.room = {
        number: session['session_room'][0],
        id: session['session_room_ID'][0],
        info: session['session_room_info'][0]
      };
      paper.session.isWorkshop = false;
      paper.session.isDemo = false;
      paper.session.isUPATrack = false;
      paper.session.isMCITrack = false;
      if (session['session_short'][0].startsWith(WORKSHOP_INDICATOR)) {
        paper.session.isWorkshop = true;
        paper.session.workshopId = parseInt(session['session_short'][0].replace('MCI-WS', ''), 10);
        return paper;
      }
      if (session['session_short'][0].startsWith(DEMO_INDICATOR)) {
        paper.session.isDemo = true;
        return paper;
      }
      if (session['session_short'][0].startsWith(UPA_INDICTOR)) {
        paper.session.isUPATrack = true;
        return paper;
      }
      if (session['session_short'][0].startsWith(MCI_INDICATOR)) {
        paper.session.isMCITrack = true;
        return paper;
      }
    }
    return paper;
  }
}

module.exports = SessionProcessor;