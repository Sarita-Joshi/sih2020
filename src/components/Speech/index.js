import React, { Component } from 'react';
import * as ROUTES from '../../constants/routes';
import './index.css';
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition 
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en'

var apiKey = "AIzaSyASmipGcBhywx0YkexKGjUVckN3fxOsKsk";
var options = {
  concurrentLimit: 20,
  requestOptions: {
    proxy: 'http://123.123.123.123:8080',   
  },
};
var googleTranslate = require('google-translate')(apiKey, options);

class Speech extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listening: false
    }
    this.i=0;
    this.text='';
    this.sugg_text='';
    this.sym_text='';
    this.adv_text='';
    this.dia_text='';
    this.toggleListen = this.toggleListen.bind(this)
    this.handleListen = this.handleListen.bind(this)
    this.callAPI = this.callAPI.bind(this)
  }
  
  callAPI(){

    fetch('http://localhost:9000/name?data='+ document.getElementById('finaltext').value)
    .then(res => res.json())
    .then(res => {
      this.setState({apiResponse : res})

  
      for (this.i = 0; this.i < res.Dose.length; this.i++) {
        this.text += res.Medicines[this.i]+" for "+res.Days[this.i]+" Days, "+res.Dose[this.i]+"\n";
      }

      for (this.i = 0; this.i < res.Symptom.length; this.i++) {
        this.sym_text += res.Symptom[this.i]+"\n";
      }

      for (this.i = 0; this.i < res.Advice.length; this.i++) {
        this.adv_text += res.Advice[this.i]+"\n";
      }

      for (this.i = 0; this.i < res.Recommendations.length; this.i++) {
        this.sugg_text += res.Recommendations[this.i]+"\n";
      }

      for (this.i = 0; this.i < res.Diagnosis.length; this.i++) {
        this.dia_text += res.Diagnosis[this.i]+"\n";
      }
     
      //
      this.props.history.push({
        pathname: ROUTES.PRESCRIPTION,

        state : {
        PatientName: res.PatientName,
        Age: res.Age,
        Symptoms: this.sym_text,
        Diagnosis: this.dia_text,
        Medicines: this.text,
        Advice: this.adv_text,
        Recommendations: this.sugg_text,
        }
      }) 
  }); 
  }

  toggleListen() {
    this.state.listening = !this.state.listening;
     this.handleListen();
  }
  
  handleListen(){ 
    if (this.state.listening) {
      document.getElementById('microphone-btn').innerHTML = "stop";
      recognition.start()
    } else {
      document.getElementById('microphone-btn').innerHTML = "record";
      recognition.stop()      
    }

    let finalTranscript = ''
    recognition.onresult = event => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + ' ';
        else interimTranscript += transcript;
      }
      if(interimTranscript.length<=1){
        //document.getElementById('interim').innerHTML = "!"  
      }else{
        //document.getElementById('interim').innerHTML = interimTranscript
      }

      document.getElementById('finaltext').value = finalTranscript;

      // googleTranslate.detectLanguage(finalTranscript, function(err, detection){
      //   console.log(detection);
      //   // =>  { language: "en", isReliable: false, confidence: 0.5714286, originalText: "Hello" }
      // });

      // googleTranslate.translate(finalTranscript, 'en', function(err, translation) {
      //   console.log(translation.translatedText);
      //   // =>  Mi nombre es Brandon
      // });
      googleTranslate.translate(finalTranscript, 'en', function(err, translation) {
        console.log(translation);
        // =>  { translatedText: 'Hallo', originalText: 'Hello', detectedSourceLanguage: 'en' }
      });
      
    } 

}

  render() {
    return (
      <div className="wrap">
        <button id="microphone-btn" className="btn btn-primary btn-block btn-lg" onClick={this.toggleListen}>Record</button><br/>
        <button id="recognize-btn" className="btn btn-primary btn-block btn-lg" onClick={this.callAPI} type="submit">Recognize</button>
        <div id="interim" color='gray'></div>
        <textarea id="finaltext" className="form-control txt" rows="10" placeholder="transcript" color='black'/>
      </div>
    )
  }
}

export default Speech;