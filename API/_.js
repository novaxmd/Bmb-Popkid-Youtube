import fetch from "node-fetch";

export default async function handler(req, res){
    const API = "https://eliteprotech-apis.zone.id";
    const query = req.query.q || req.query.url || req.query.prompt;
    if(!query) return res.status(400).json({success:false,error:"Missing parameter"});

    const endpoint = req.url.includes("ytsearch") ? `${API}/ytsearch?q=${encodeURIComponent(query)}`
                  : req.url.includes("ytdown") ? `${API}/ytdown?format=mp3&url=${encodeURIComponent(query)}`
                  : req.url.includes("musicgen") ? `${API}/musicgen?prompt=${encodeURIComponent(query)}`
                  : req.url.includes("spotify1") ? `${API}/spotify1?url=${encodeURIComponent(query)}`
                  : req.url.includes("sps") ? `${API}/sps?url=${encodeURIComponent(query)}`
                  : null;

    if(!endpoint) return res.status(400).json({success:false,error:"Invalid endpoint"});

    const r = await fetch(endpoint);
    const data = await r.json();
    res.status(200).json(data);
      }
      
