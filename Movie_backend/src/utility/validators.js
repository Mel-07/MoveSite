

class Validate {
  constructor() {}
  /**
   * @param {string} email
   */
  email = (email) => {
    if (email) {
      const test = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
      return test;
    } 
  };
  /**
   * @param {string} password
   */
  password = (password) => {
    if (password) {
      const test =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,18}$/.test(
          password
        );

      return test;
    } 
  };
  /**
   * @param {string} userName
   */
  userName = (userName) => {
        if (userName) {
          const test = /^([a-zA-Z]\s*)+$/.test(userName);

          return test;
        } 
  };
}


module.exports =  new Validate()