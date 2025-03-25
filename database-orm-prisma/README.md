# Prisma ORM

I once built a database for a product I was working on—something for English learners. Simple, but useful.

I used Prisma. Designed it to store words, their meanings, and example sentences. Users could create their own lists, picking the words and senses they wanted to practice. They could even track their progress with [SuperMemo](https://github.com/VienDinhCom/supermemo) flashcards.

It never became a big product. But I learned a lot. So now, I’m sharing it. Maybe someone else will find it useful. Maybe it'll spark an idea.

That’s the thing about building—it’s never just about the final product. It’s about what you pick up along the way.

## Usage

### `docker compose up`

First, copy the `sample.env` file to `.env`, and then run docker compose to set up the PostgreSQL database for this project.

### `volta setup`

This project was developed with Node 22 and NPM 10.<br>

To set up a compatible environment, please download [Volta](https://github.com/volta-cli/volta) and run `volta setup`.

### `npm run migrate:dev`

Finally, run this command to apply migrations from Prisma to the PostgreSQL database inside the Docker container.

# Diagram

<img src="diagram.png" alt="Vien Dinh's Supermemo Database">
