import User from "../models/User.model";
import  jwt  from "jsonwebtoken";
import config from "../config";

// Función para registrar un nuevo usuario
export const singUp = async (req,res)=>{
    try {
        const {name,lastName,email,password} = req.body;

        // Verificar si el usuario ya existe
        const response = await User.findOne({email})
        if (response) return res.status(400).json({message:"El usuario ya existe"})

        // Crear un nuevo usuario
        const newUser = new User({
            name,
            lastName,
            email,
            password: await User.ecryptPassword(password)
        });

        // Guardar el usuario en la base de datos
        const userSaved = await newUser.save();

        // Crear un token para el usuario
        const token = jwt.sign({id: userSaved._id},config.SECRET,{
            expiresIn: 86400
        })
        res.status(200).json({token});
    } catch (error) {
        // Código de error 500 para errores internos del servidor
        // Se utiliza cuando no se puede determinar un código de estado más específico.
        res.status(500).json({message: "Error interno del servidor"});
    }
}

// Función para iniciar sesión
export const singIn = async (req,res)=>{
    try {
        const {email,password} = req.body;

        // Verificar si el usuario existe
        const response = await User.findOne({email})
        if (!response) return res.status(400).json({message:"Usuario no encontrado"})
        
        // Verificar si la contraseña es correcta
        const matchPassword = await User.comparePassword(password,response.password)

        if(!matchPassword) return res.status(400).json({message:"Contraseña inválida", token: null})
        
        // Crear un token para el usuario
        const token = jwt.sign({id:response._id},config.SECRET,{
            expiresIn: 86400
        })

        res.status(200).json({token,message:'correcto'})
    } catch (error) {
        // Código de error 500 para errores internos del servidor
        // Se utiliza cuando no se puede determinar un código de estado más específico.
        res.status(500).json({message: "Error interno del servidor"});
    }
}

// Función para obtener todos los usuarios
export const getAll = async (req,res)=>{
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        // Código de error 500 para errores internos del servidor
        // Se utiliza cuando no se puede determinar un código de estado más específico.
        res.status(500).json({message: "Error interno del servidor"});
    }
}

