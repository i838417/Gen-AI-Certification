
# Branches instruction

- Main
    release3, ***DO NOT check in code in this branch, instead check in hyperspace branch and merge to main***

- hyperspace  
    release3, development branch which connect to sirius

- release2    
    release2

- beta       
    beta release 

# Folder instruction

- app folder
    contain following frontend apps
    - app-configurator
    - app-lookup
    - app-notification
    - app-upload

- db folder
    contain database artifacts
    - _18n: translation files 
    - data: default database records
    - srv: not used
    - data-model.cds: data model schema file

- gen foldder
    CAP generated artifacts for deployment

- srv folder
    CAP services for notifcation app


- srv-release2 folder
    contain nodejs service for configurator, lookup, notifcation and upload apps

- mta.yaml
    Deployment artifact (contrain relationships of apps and services)

- xs-security.json
    contain security user inform CertificateAppUser

- test.http
    contain test file for CAP service