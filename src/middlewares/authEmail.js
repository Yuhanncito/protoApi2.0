import {transporter} from '../libs/emailConfig'
import Confirm from '../models/confirm.model';

export const verifyEmail = async (email,codigoSecreto)=> {
    try {

        const verify = await Confirm.findOne({email:email});

        if(verify) {
            return false; 
        }
        else{
            const newConfirm = new Confirm({
                email:email,
                secretCode:codigoSecreto
            })
            
            const savedConfirm = newConfirm.save();

            
            await new Promise ((resolve,reject)=>{
                transporter.sendMail({
                    from: '"Codigo de Verificación" <uchijaisuka02@gmail.com>', // sender address
                    to: email, // list of receivers
                    subject: "Codigo de verificacion",// plain text body
                    html: `
                   
                        <html>
                            <head>
                                <style>
                                    .bg-white {
                                        background-color: #fff;
                                    }
                                    .shadow-xl {
                                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                    }
                                    .w-50 {
                                        width: 100%;
                                    }
                                    .h-30 {
                                        height: 100%;
                                    }
                                    .rounded-3xl {
                                        border-radius: 1.5rem;
                                    }
                                    .flex {
                                        display: flex;
                                    }
                                    .flex-col {
                                        flex-direction: column;
                                    }
                                    .justify-center {
                                        justify-content: center;
                                    }
                                    .items-center {
                                        align-items: center;
                                    }
                                    .font-bold {
                                        font-weight: bold;
                                    }
                                    .text-3xl {
                                        font-size: 1.875rem;
                                    }
                                    .text-2xl {
                                        font-size: 1.5rem;
                                    }
                                    .text-red-500 {
                                        color: #f56565;
                                    }
                                </style>
                            </head>
                            <body>
                            <div class="bg-white">
                                <div class="bg-white shadow-xl w-50 h-30 rounded-3xl flex flex-col">
                                    <div class="flex w-full h-30 justify-center items-center">
                                        <h1 class="font-bold text-3xl">Código de verificacion</h1>
                                    </div>
                                    <div class="flex w-full flex-col justify-center items-center mb-10">
                                        <h2 class="font-bold text-2xl">Este código es valido por 1 solo intento</h2>
                                        <p class="text-2xl">Su código es: ${codigoSecreto}</p>
                                    </div>
                                    <div class="flex justify-center items-center">
                                        <h1 class="text-red-500 font-bold text-2xl">Si usted no generó algún codigo de verificacion, ignore este mail</h1>
                                    </div>
                                </div>
                            </div>
                            </body>
                        </html>
                   
                    `, // html body
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

        deleteCodeTime(codigoSecreto, email);
        return true
        }
    }catch(err){
        return false
    }
}

const deleteCodeTime = async (code,mail) =>{
    try{
       
        setTimeout(async() => {
            const doc = await Confirm.findOne({email:mail})
            if(!doc) return 0
            await Confirm.findOneAndDelete({email: mail});
            console.log("ok borrao")
        }, 5 * 60 * 1000);
    }
    catch(err){
        console.log(err)
    }
} 