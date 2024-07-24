# Use uma imagem base do Node.js
FROM node:18

# Crie um diretório para a aplicação
WORKDIR /usr/src/app

# Copie os arquivos de configuração da aplicação para o container
COPY package*.json ./

# Instale as dependências da aplicação
RUN npm install

# Copie o restante dos arquivos da aplicação para o container
COPY . .

# Exponha a porta que a aplicação irá rodar
EXPOSE 3001

# Comando para iniciar a aplicação
CMD ["yarn", "dev"]
