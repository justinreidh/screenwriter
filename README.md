# Screenwriter App

This is a full-stack WYSIWYG screenwriting application bootstrapped using create-next-app. It uses the Tiptap editor framework to create custom block-level components that supports proper screenplay formating, the OpenAI API for live feedback via the OpenAI API, and a secure backend for managing user accounts and saving work.

## Features
Screenplay Editor using custom TipTap extensions: Block-level formatting for scene headers, action, dialogue, character names, and more, structured according to industry-standard screenplay format.

AI Feedback via the OpenAI API for real-time insights, suggestions, or critiques on user-selected text.

Authentication using JWTs with input validation using express-validator.

Data storage for user accounts and screenplay drafts using a PostgreSQL in Supabase

RESTful API built with Express, Sequelize, and Node.js for the backend and a Next.js frontend.

## Running the Program

Prerequisites
Node.js ≥ 18.x

A PostgreSQL DB (via Supabase or local)

An OpenAI API key

### Install Dependencies
#### frontend
npm install

#### backend
npm install

#### Environment Setup
Create a .env file in the backend directory with the following variables: 

DATABASE_URL=postgres://...
JWT_SECRET=...
PORT=...
OPENAI_API_KEY=sk-proj...

### Database Setup
If you're using Supabase:

Create a project in Supabase.

Find the database URL and add it to your .env file.

### Run the App
In the frontend directory, run:

npm run dev

The program runs on http://localhost:3000

In the backend directory, run:
node server.js
