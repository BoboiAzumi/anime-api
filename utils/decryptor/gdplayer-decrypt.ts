import { fetching } from "../inet/fetching";
import { post } from "../inet/post";
import { decryptorRegistry } from "./decryptor-registry";
import { Decryptor, Source, SourceItem } from "./types";
import CryptoJS from "crypto-js"

const I = (function () {
    let T = true
    return function (N: any, g: any) {
      let r = T
        ? function () {
            if (g) {
              let W = g.apply(N, arguments)
              return (g = null), W
            }
          }
        : function () {}
      return (T = false), r
    }
  })(),
  G = I(this, function () {
    return G.toString()
      .search('(((.+)+)+)+$')
      .toString()
      .constructor(G)
      .search('(((.+)+)+)+$')
  })
G()
const CryptoJSAesJson = {
  encrypt: function (B: any, u: any) {
    let T = { format: CryptoJSAesJson }
    return CryptoJS.AES.encrypt(JSON.stringify(B), u, T).toString()
  },
  decrypt: function (B: any, u: any) {
    let T = { format: CryptoJSAesJson }
    return JSON.parse(CryptoJS.AES.decrypt(B, u, T).toString(CryptoJS.enc.Utf8))
  },
  stringify: function (l: any) {
    let B: {iv?: any, s?: any, ct: any} = { ct: l.ciphertext.toString(CryptoJS.enc.Base64) }
    if (l.iv) {
      B.iv = l.iv.toString()
    }
    if (l.salt) {
      B.s = l.salt.toString()
    }
    return JSON.stringify(B).replace(/\s/g, '')
  },
  parse: function (B: any) {
    let L = JSON.parse(B)
    let r = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(L.ct),
    })
    if (L.iv) {
      r.iv = CryptoJS.enc.Hex.parse(L.iv)
    }
    if (L.s) {
      r.salt = CryptoJS.enc.Hex.parse(L.s)
    }
    return r
  },
}
function _decx(B: any) {
  return CryptoJSAesJson.decrypt(B, 'F1r3b4Ll_GDP~5H')
}

export class GdplayerDecryptor implements Decryptor {
    async processing(url: string, ua: string): Promise<Source> {
        const html = await fetching(url, ua)
        const source: Source = {
            type: "",
            title: "",
            sources: [],
            tracks: [],
            poster: ""
        }

        const regex = /eval\(function\([\s\S]*?\)\)/;

        const match = html.match(regex);
        if(!match){
            return source
        }
        const ev = (eval(`${match[0].replace("eval", "")})`) as string).split(";")

        let apx
        let kaken

        for(let i = 0; i < ev.length; i++){
            const splitting = ev[i].split("=")
            if(splitting[0] == "window.apx") {
                apx = splitting[1].substring(1, splitting[1].length - 1)
            }
            if(splitting[0] == "window.kaken") {
                kaken = splitting[1].substring(1, splitting[1].length - 1)
            }
        }

        const apxUrl = Buffer.from(apx as string, "base64").toString("utf-8")
        const fApxUrl = await fetching(apxUrl, ua)
        const decx = JSON.parse(_decx(fApxUrl))

        const jsonFile = JSON.parse(await post(`${decx.apiURL}/api`, ua, {
            "Content-Type": "text/plain"
        }, kaken as string))

        source.type = "video"
        source.poster = jsonFile.poster
        source.title = jsonFile.title

        for(let i = 0; i < jsonFile.sources.length; i++){
            const sourceItem: SourceItem = {
                src: jsonFile.sources[i].file,
                size: 720,
                type: jsonFile.sources[i].type,
            }

            source.sources.push(sourceItem)
        }

        return source
    }
}

decryptorRegistry.register("gdplayer.to", new GdplayerDecryptor())