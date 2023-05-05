#language: pt

Funcionalidade: Login

    #|   name    |            email          |   password    |   is_shaver   |
    #|   Bruno   |   bruno.araujo@system.com |   pwd123      |   false       |

Cenario: Login do Cliente

    Dado que tenho o seguinte usuário:
        |name       |Bruno                   |
        |email      |bruno.araujo@system.com |
        |password   |pwd123                  |
        |is_shaver  |false                   |
    E que acesso o totem
    Quando submeto essa credenciais
    Então sou autenticado com sucesso

Cenario: Senha Incorreta

    Dado que tenho o seguinte usuário:
        |name       |Bruno                   |
        |email      |bruno.araujo@system.com |
        |password   |pwd123                  |
        |is_shaver  |false                   |
    E que esse usuario tenha senha incorreta 
    E que acesso o totem
    Quando submeto essa credenciais
    Então devo ver a mensagem de alerta "Ocorreu um erro ao fazer login, verifique suas credenciais."
