# APP

Gympass style APP

## RFs (requisitos funcionas)

- [✅] Deve ser possível se cadastrar;
- [✅] Deve ser possível fazer login (se autenticar);
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de chack-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histório de checkins;
- [ ] Deve ser possível ao usuário buscar academias próximas;
- [ ] Deve ser possível ao usuário buscar academias pelo nome;
- [ ] Deve ser possível ao usuário realizar check0in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado; (campo unique)
- [ ] O usuário não deve poder fazer 2 check-ins no mesmo dia;
- [ ] O usuário não deve poder fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O cehck-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrada por administradores;

## RNFs (requisitos não-funcionas)

- [ ] A senha do usuário precisa estar encriptografada;
- [ ] Os dados da aplicação devem estar persistidos em um banco de dados PostgreSQL;
- [ ] Todas as listas de dados precisa estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT;
