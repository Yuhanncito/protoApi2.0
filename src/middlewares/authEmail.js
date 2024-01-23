import {transporter} from '../libs/emailConfig'
import Confirm from '../models/confirm.model';

export const verifyEmail = async (email,codigoSecreto)=> {
    try {
        const newConfirm = new Confirm({
            email,
            secretCode:codigoSecreto
        })

        const savedConfirm = newConfirm.save();

        await new Promise ((resolve,reject)=>{
            transporter.sendMail({
                from: '"Codigo de Verificación" <uchijaisuka02@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Codigo de verificacion", // Subject line
                text: "Tu codigo de verificacion es:", // plain text body
                html: `<p>${codigoSecreto}</p>`, // html body
            },(err,info)=>{
                if (err) {
                    console.error(err);
                    reject(err);
                  } else {
                    console.log(info);
                    resolve(info);
                  }
            })
        }
      );
    }catch(err){
        console.log(err);
    }
}
