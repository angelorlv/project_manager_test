
create table if not exists utilisateur(
    uti_id int not null auto_increment,
    uti_name varchar(100) null,
    uti_lastname varchar(255) null,
    uti_email varchar(255) null,
    uti_password varchar(255) null,
    uti_created_at datetime null default NOW(),
    uti_role varchar(10) null, 
    PRIMARY KEY (uti_id)
)ENGINE=InnoDB;

create table if not exists project(
    project_id int not null auto_increment,
    project_name varchar(100) null,
    project_description text null,
    project_status varchar(100) null,
    project_uti_id int null, 
    project_created_at datetime null default NOW(),
    project_updated_at datetime null on update NOW(),
    PRIMARY KEY (project_id)
)ENGINE=InnoDB;
