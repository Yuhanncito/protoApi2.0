import {transporter} from '../libs/emailConfig'
import Confirm from '../models/confirm.model';

export const verifyEmail = async (email,codigoSecreto)=> {
    try {
        const newConfirm = new Confirm({
            email,
            secretCode:codigoSecreto
        })

        const savedConfirm = newConfirm.save();

        await transporter.sendMail({
        from: '"Codigo de Verificación" <uchijaisuka02@gmial.com>', // sender address
        to: email, // list of receivers
        subject: "Codigo de verificacion", // Subject line
        text: "Tu codigo de verificacion es:", // plain text body
        html: `<p>${codigoSecreto}</p>`, // html body
      });
    }catch(err){
        console.log(err);
    }
}
