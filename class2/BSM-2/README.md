# Class 2. Exercise 1

_Download the zip archive with source codes of the programs that students produced for the previous exercise. Think how to bypass security in those programs - imagine that your policeman friend asked you to be a police expert, and recovering the message in the phones in police possession will strike a blow against terrorism and make bringing democracy to the world ever closer. What will you advise? Unfortunately, you do not have access to the phone itself, but you can see the application's source code - you have to pass on to police experts the general idea of what to (they will not accept any executable code either, due to their security policies)._

### File 1

Judging by the source code, which was provided, bypassing the protection will be quite simple. To do this you just need to call the loadData() function, which will load the data from some storage. I am surprised that I can not find in the project any checks, mapping, or at least interaction with passwords.

### File 2

The startActivity() function catches my eye in this project, if we have access to the application source code, we can simply call it, skipping all the password checks

### File 3

We can call the function to change the password and replace it with the one we want, we can do this, because the application doesn't check if the old password matches before setting the new one.
We can also do it the easy way, like in the previous app, and call the initialization function of the screen we need with the note(startActivity()) again, bypassing the password

### File 4

In contrast to previous projects, the server is a standalone application, which makes it hard or rather impossible to change the source code, namely the password handling logic.
Some ideas that came to mind:

- Stealing a JWT token from an authorized user, thus gaining access to his notes.
- SQL\NOSQL injection. I doubt that it will work, but it can be tried. We can access the database, but we will not see the passwords, because the application's author uses hashing. But we can get access to the notes, user ids, logins.
- We can try to send a request to the web server to update (/update/) the user, which was written to change the password, but as parameters we will not change the password, but the user-ID. In this way, we will "change the identity" and pretend to be another user, thus gaining access to his notes.

### File 5

Changing the password happens without checking the old password, not very secure for me. To gain access to a device where the user is already logged in, change the password, and log out of the account. At a minimum, the device owner would lose access to his notes; at a maximum, with the help of social engineering, the attacker gets the login information and gains access to the notes.

### File 6

Again we can get direct access through startActivity(), bypassing all the checks. By the way, I want to point out that this is one of the few applications that have a password check before replacing it with a new one.

### File 7

Even using getNotes() we can't access the notes because they are encrypted and will require a password to decrypt. Yes, we can take the whole application apart and use only the part where the program pulls the desired note from memory, but that's not interesting.

## Result

| File | Password change protection | Note protection | Dedicated server | User interaction | General assessment |
| ---- | -------------------------- | --------------- | ---------------- | ---------------- | ------------------ |
| 1    | inapplicable               | -               | -                | inapplicable     | 1                  |
| 2    | inapplicable               | +               | +                | inapplicable     | 1                  |
| 3    | -                          | -               | -                | inapplicable     | 2                  |
| 4    | +                          | +               | +                | +                | 5                  |
| 5    | -                          | -               | +                | inapplicable     | 3                  |
| 6    | +                          | -               | -                | inapplicable     | 2                  |
| 7    | +                          | +               | -                | inapplicable     | 4                  |
