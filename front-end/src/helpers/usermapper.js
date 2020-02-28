import User from './user';

export default class UserMapper {
    static map({
                   name, email, password, image, favoriteBooks, id
               }) {
        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        user.image = image;
        user.favoriteBooks = favoriteBooks;
        user.id = id;
        return user;
    }
}