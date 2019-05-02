**members:**
- daniela
- albert
- edgar

# Skybrary
---

## Description:
**Skybrary is an open online library where you can find your favorite books and keep track of your current lectures.**

## Functional description:
As a user I expect to find my favorite books and maybe discover new ones. Also I want to mark the books I will read, the ones I'm currently reading, and the ones I already read.

### Functionalities:
- **Books I'm reading**
- **Books I want to read**
- **Books I already read**
- **Search books**
- Books suggestions

---


## Data:

USER has this schema:
```
| - email - string * (required)
| - password - string * (required)
| - alias - string
| - relatedBooks - Array of Objects each of them is a book
| -- ISBN - string - Book identifier
| -- favList - key/value of boolean - If book is favorite or not
| -- readingList  - key/value of boolean - Currently reading this book
| -- doneList  - key/value of boolean - Book already read
| -- wantToRead - key/value of boolean - Book save for read later
| -- timesRead - Number - Number of times a books has been read
```