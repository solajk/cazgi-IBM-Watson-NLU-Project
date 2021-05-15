const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

//const nluInstance = getNLUInstance(api_key = '', api_url = 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/9f275682-ff52-4247-b3ba-df76c96c4c0d');
    

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        "features": {
            //"entities": {
                "emotion": {
                    "document": true
                }
            }
        
    }
    nluInstance.analyze(analyzeParams).then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        console.log(JSON.stringify(analysisResults.result.emotion.document.emotion));
        // return analysisResults
         return res.send(analysisResults.result.emotion.document.emotion)
        })
        .catch(err => {
            console.log('error:', err);
             res.send({"happy":"10","sad":"90"});
            });
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        "features": {
            "sentiment": {
            }
        }  
    }
    nluInstance.analyze(analyzeParams).then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        console.log(JSON.stringify(analysisResults.result.sentiment.document.label));
        // return analysisResults
         return res.send(JSON.stringify(analysisResults.result.sentiment.document.label))
        })
        .catch(err => {
            console.log('error:', err);
             res.send("url sentiment for "+req.query.url);
            });
    //return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        "text": req.query.text,
        "features": {
            "entities": {
                "emotion": true
            }
        },
    }
    
    nluInstance.analyze(analyzeParams).then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        console.log(JSON.stringify(analysisResults.result.entities[0].emotion));
        // return analysisResults
         return res.send(analysisResults.result.entities[0].emotion)
        })
        .catch(err => {
            console.log('error:', err);
             res.send({"happy":"10","sad":"90"});
            });
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        "features": {
            "sentiment": {
            }
        }  
    }
    nluInstance.analyze(analyzeParams).then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        console.log(JSON.stringify(analysisResults.result.sentiment.document.label));
        // return analysisResults
         return res.send(JSON.stringify(analysisResults.result.sentiment.document.label))
        })
        .catch(err => {
            console.log('error:', err);
             res.send("error: ", err);
            });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
          apikey: api_key,
        }),
        serviceUrl: api_url
    });
    return naturalLanguageUnderstanding;
}