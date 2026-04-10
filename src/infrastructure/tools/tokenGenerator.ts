export const generateToken = () => {
    let token = [];
      for (let i: number = 0; i <= 6; i++) {
        token.push(Math.floor(Math.random() * 10));
      }
      console.log(token.join(''));
}
generateToken();
