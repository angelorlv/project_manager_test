let db  = require('../models/data')
let Utils = require('../config/utils')

const jwt = require("jsonwebtoken");

require('dotenv').config()
const config = process.env

class User{
    // AUTHENTIFICATION D'UN ADMIN
    static async authUser(req,res){        
        let {uti_email,uti_password} = req.body
        try {
            //Recherche de l'utilisateur
            let u = await db.exec_params('select * from utilisateur where uti_email = ?',[uti_email])
            if(u.length > 0){
                u = u[0]
                //Comparaison du mot de passe
                let b = await Utils.compare(uti_password,u.uti_password)
                if(b){
                    //insertion de l'utilisateur dans le JWT
                    let u_save = {
                        uti_id:u.util_id,
                        uti_email:u.uti_email,
                        uti_name:u.uti_name,
                        uti_lastname:u.uti_lastname,
                        uti_role:u.uti_role,               
                    }
                    const token = jwt.sign(u_save,config.TOKEN_KEY)
                    let options = {
                        path:"/",
                        sameSite:true,
                        httpOnly: true, // The cookie only accessible by the web server
                    }
                    res.cookie('x-access-token',token, options)           
                    return res.status(200).send({message:"Le Mot de passe correspond",user:u_save})
                }else{
                    return res.status(200).send({error:"Le mot  de passe ne correspond pas"})
                }
            }else{
                return res.status(200).send({error:`L'identifiant n'existe pas dans la base`})
            }
        } catch (e) {
            console.error(e)
            return res.status(500).send({error:`Erreur survenue dans la base de donnée`})
        }
    }

    //ICI CREATION DE L'ADMIN DE BASE à PARTIR DE REQUETE GET
    static async createMaster(req,res){
        try {
            let {l,p,n} = req.query

            if(l === undefined || p === undefined){
                return res.status(403).send({error:"Données incorectes"})
            }

            // vérification si le login master est déjà dans la base
            let uf = await db.exec_params(`select * from utilisateur where uti_email = ? and uti_role = 'admin'`,[l])

            if(uf.length > 0){
                return res.status(401).send({error:"Le compte existe déjà"})
            }

            let u = {
                uti_email:l,
                uti_password:await Utils.hash(p),
                uti_name: n?n:"Admin",
                uti_role:'admin'
            }

            await db.set('utilisateur',u)
            return res.status(200).send({message:"Master bien créer"})
        } catch (e) {
            console.error(e)
            return res.status(500).send({error:`Erreur survenue dans la base de donnée`})
        }
    }

    //Déconnexion
    static async deconnect(req,res){
        try {
            let options = {
                path:"/",
                sameSite:true,
                httpOnly: true, // The cookie only accessible by the web server
            }
            res.cookie('x-access-token','....', options)
            res.status(200).send({message:"Log out"})
        } catch (e) {
            console.error(e)
            return res.status(500).send({error:`Erreur survenue dans la base de donnée`})
        }
    }


    //Création utilisateur
    static async createUser(req,res){
        try {
            let {uti_name,uti_lastname,uti_email,uti_password,uti_role} = req.body


            if(!uti_email || uti_email.trim() == ''){
                return res.status(401).send({error:"L'adresse email est obligatoire"})
            }

            if(!uti_password){
                return res.status(401).send({error:"Le mot de passe est obligatoire"})
            }

            if(!uti_role){
                return res.status(401).send({error:"Le role de l'utilisateur est obligatoire"})
            }

            let uti = {
                uti_name:uti_name?uti_name.trim():null,
                uti_lastname:uti_lastname?uti_lastname.trim():null,
                uti_email:uti_email.trim(), // obligtatoire
                uti_role
            }

            uti_password = Utils.hash(uti_password)
            uti.uti_password = uti_password

            return req.status(200).send({message:"Utilisateur bien créer"})
        } catch (e) {
            console.log(e)
            return res.status(500).send({error:"Erreur dans le serveur"})
        }
    }

    static async getListUser(req,res){
        try {
            let {role = 'all'} = req.query
            if(['admin','normal'].indexOf(role) == -1) role = 'all'

            let users = await db.exec_params(`select * from utilisateur where ${rolle == 'all'}?'role <> ?':'role = ?' `,[role])

            return res.status(200).send({users})
        } catch (e) {
            console.error(e)
            return res.status(500).send({error:"Erreur dans le serveur"})
        }
    }

    static async deleteUser(req,res){
        try {
            
            let {uti_id} = req.query
            let pr_user = await db.exec_params('select * from project where project_uti_id = ?',[uti_id])

            await db.beginTransaction()

            if(pr_user.length > 0){
                await db.updateWhere('project',{project_uti_id:null},{project_uti_id:uti_id})
            } 

            await db.del('utilisateur',{uti_id})

            await db.commit()

            return res.status(200).send({message:"Utilisateur bien supprimer"})
        } catch (e) {
            await db.rollback()
            console.error(e)
            return res.status(500).send({error:"Erreur dans le serveur"})
        }
    }

    static async updateUserFromAdmin(req,res){
        try {
            let {uti_id,uti_name,uti_lastname,uti_email,uti_password,uti_role,change_pass} = req.body
    
    
            if(!uti_email || uti_email.trim() == ''){
                return res.status(401).send({error:"L'adresse email est obligatoire"})
            }

            if(!uti_password && change_pass){
                return res.status(401).send({error:"Le mot de passe est obligatoire"})
            }

            if(!uti_role){
                return res.status(401).send({error:"Le role de l'utilisateur est obligatoire"})
            }

            let uti = {
                uti_name:uti_name?uti_name.trim():null,
                uti_lastname:uti_lastname?uti_lastname.trim():null,
                uti_email:uti_email.trim(), // obligtatoire
                uti_role
            }

            if(change_pass){
                uti_password = Utils.hash(uti_password)
                i.uti_password = uti_password
            }

            await db.updateWhere(uti,{uti_id})
            return res.send({message:"Utilisateur bien modifié"})

        } catch (e) {
            console.error(e)
            return res.status(500).send({error:"Erreur dans le serveur"})
        }
    }

    static async updateUserFromUser(req,res){
        try {
            let {uti_name,uti_lastname,uti_email,uti_password,uti_password_old,uti_role,change_pass} = req.body
    
    
            if(!uti_email || uti_email.trim() == ''){
                return res.status(401).send({error:"L'adresse email est obligatoire"})
            }

            if((!uti_password || !uti_password_old) && change_pass){
                return res.status(401).send({error:"Le mot de passe est obligatoire"})
            }

            if(!uti_role){
                return res.status(401).send({error:"Le role de l'utilisateur est obligatoire"})
            }

            //vérification du mot de passe en cas de changement de mot de passe
            if( change_pass){
                let uti_cur = (await db.exec_params('select * from utilisateur where uti_id = ?',[req.user.uti_id]))[0]

                let b = await Utils.compare(uti_password_old,uti_cur.uti_password)
                if(!b){
                    return res.status(401).send({error:"Le mot de passe ne correspond pas"})
                }
            }

            let uti = {
                uti_name:uti_name?uti_name.trim():null,
                uti_lastname:uti_lastname?uti_lastname.trim():null,
                uti_email:uti_email.trim(), // obligtatoire
                uti_role
            }

            if(change_pass){
                uti_password = Utils.hash(uti_password)
                uti.uti_password = uti_password
            }

            await db.updateWhere(uti,{uti_id})
            return res.send({message:"Utilisateur bien modifié"})

        } catch (e) {
            console.error(e)
            return res.status(500).send({error:"Erreur dans le serveur"})
        }
    }
}
module.exports = User