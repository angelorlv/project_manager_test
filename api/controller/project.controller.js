let db = require('../models/data')

class ProjectController{
    static async create(req,res){
        try{
            let _project_state = req.state.project_state
            let _project_state_list = Object.keys(_project_state)

            let {project_name,project_description,project_state} = req.body

            if(!project_name || project_name.trim() == '') return res.status(401).send({error:"Le nom du projet est obligatoire"})
            if(!project_description || project_description.trim() == '') return res.status(401).send({error:"La description du projet est obligatoire"})

            project_state = (!project_state || _project_state_list.indexOf(project_state) == -1)?req.state.project_state_default:project_state

            let _pr_insert = {project_name:project_name.trim(),project_description,project_status:project_state}

            await db.set('project',_pr_insert)

            return res.status(200).send({message:"Projet bien créer"})
            
        }catch(e){
            console.error(e)
            return res.status(500).send({error:"Erreur dans le serveur"})
        }
    }

    static async changeStateProject(req,res){
        try {
            let {user} = req
            let _project_state = req.state.project_state
            let _project_state_list = Object.keys(_project_state)

            let {project_state = 'in_progress',project_id} = req.body

            if(_project_state_list.indexOf(project_state) == -1) project_state = 'in_progress'

            if(user.uti_role != "admin"){
                let _pr = await db.exec_params('select project_id from project where project_id = ? and project_uti_id = ?'[project_id,user.uti_role])
                if(_pr.length  == 0) return res.status(403).send({error:"Erreur d'accès"})
            }

            await db.updateWhere({project_status:project_state},{project_id})
            
            return res.status(200).send({message:"Status du projet bien modifié"})
        } catch (e) {
            console.error(e)
            return res.status(500).send({error:"Erreur dans le serveur"})
        }
    }

    static async updateProject(req,res){
        try {
            let {project_id,project_name,project_description,project_state,uti_id = null} = req.body

            let _project_state = req.state.project_state
            let _project_state_list = Object.keys(_project_state)

            if(!project_name || project_name.trim() == '') return res.status(401).send({error:"Le nom du projet est obligatoire"})
            if(!project_description || project_description.trim() == '') return res.status(401).send({error:"La description du projet est obligatoire"})

            let _pr_update = {project_name:project_name.trim(),project_description}

            if(project_state || _project_state_list.indexOf(project_state) != -1){
                _pr_update.project_status = project_state.trim()
            }

            await db.updateWhere('project',_pr_update,{project_id})

            return res.status(200).send({message:"Projet bien modifié"})
        } catch (e) {
            console.error(e)
            return res.status(500).send({error:"Erreur dans le serveur"})
        }
    }

    static async deleteProject(req,res){
        try {
            let {project_id} = req.body
            await db.del('project',{project_id})
            return res.status(200).send({message:"Projet bien supprimer"})

        } catch (e) {
            console.error(e)
            return res.status(500).send({error:"Erreur dans le serveur"})
        }
    }

    static async assignProjectToUser(req,res){
        try {

            let {uti_id,project_id} = req.body
            
            let _uti_r = await db.exec_params('select uti_id from utilisateur where uti_id = ? and uti_role <> ? ',[uti_id,"admin"])
            
            let _pr_update ={project_uti_id:null}
            _pr_update.project_uti_id = _uti_r.length > 0?uti_id = _uti_r[0].uti_id:null
            _pr_update.project_status = "new" //en le met en new

            await db.updateWhere('project',_pr_update,{project_id})
            return req.status(200).send({message:"Projet bien assigné"})
        } catch (e) {
            console.error(e)
            return res.status(500).send({error:"Erreur dans le serveur"})
        }
    }

    static async getListProjectAdmin(req,res){
        try {
            let _project_state = req.state.project_state
            let _project_state_list = Object.keys(_project_state)

            let {project_state = 'all',uti_id = 'all',search = ''} = req.query

            if(_project_state_list.indexOf(project_state) == -1) project_state = 'all'

            let projects = await db.exec_params(`select project.*,uti_id,uti_name,_uti_lastname,uti_email from project
            left join utilisateur
            where project_status ${project_state == 'all'?'<>':'='} ? 
            and project_uti_id ${uti_id == 'all'?'<>':'?'}
            and (project_name like ? or project_description like ?)`,
            [project_state,uti_id,`%${search}%`,`%${search}%`])

            return res.status(200).send(projects)
        } catch (e) {
            console.error(e)
            return res.status(500).send({error:"Erreur dans le serveur"})
        }
    }

    static async getListProjectUser(req,res){
        try {
            let {user} = req

            let _project_state = req.state.project_state
            let _project_state_list = Object.keys(_project_state)

            let {project_state = 'all',search=''} = req.query

            if(_project_state_list.indexOf(project_state) == -1) project_state = 'all'

            let projects = await db.exec_params(`select * from project
            where project_status ${project_state == 'all'?'<>':'='} ? 
            and project_uti_id = ?
            and (project_name like ? or project_description like ?)`,
            [project_state,uti_id,`%${search}%`,`%${search}%`])
            return res.status(200).send(projects)
        } catch (e) {
            console.error(e)
            return res.status(500).send({error:"Erreur dans le serveur"})
        }
    }


}

module.exports = ProjectController