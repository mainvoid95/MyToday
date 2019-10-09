

CREATE TABLE user (     
    `user_number`  INT  NOT NULL    AUTO_INCREMENT,      
    `user_id`      VARCHAR(45)    NOT NULL,     
    `user_email`   VARCHAR(45)  NOT NULL    ,      
    `user_pass`    VARCHAR(255)    NOT NULL        ,      
    `user_name`    VARCHAR(45)    NULL        ,      
    PRIMARY KEY (user_number) );