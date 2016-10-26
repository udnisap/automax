module.exports = function ({vorpal, driver: {current}}){
  vorpal
    .command('login <username> <password>', 'Login into Github with given credential')
    .action(({username, password}) => current
        .url('https://github.com/login')
        .setValue('#login_field', username)
        .setValue('#password', password)
        .click('//*[@id="login"]/form/div[4]/input[3]')
    );

  vorpal
    .command('signup <email> <username> <password>', 'Signup to Github with given credential')
    .action(({username, email, password}) => current
        .url('https://github.com/join')
        .setValue('//*[@id="user_login"]', username)
        .setValue('//*[@id="user_email"]', email)
        .setValue('//*[@id="user_password"]', password)
        .click('//*[@id="signup_button"]')
        .click('//*[@id="js-pjax-container"]/div/div[2]/div/form/button')
    );

  vorpal
    .command('star <owner> <repo>', 'star the repo at github.com/<owner>/<repo>')
    .action(({owner, repo}) => current
        .url(`https://github.com/${owner}/${repo}`)
        .click('//*[@id="js-repo-pjax-container"]/div[1]/div[1]/ul/li[2]/div/form[2]/button')
    );

  vorpal
    .command('unstar <owner> <repo>', 'unstar the repo at github.com/<owner>/<repo>')
    .action(({owner, repo}) => current
        .url(`https://github.com/${owner}/${repo}`)
        .click('//*[@id="js-repo-pjax-container"]/div[1]/div[1]/ul/li[2]/div/form[1]/button')
    );

  vorpal
    .command('follow <username>', 'Follow a usename')
    .action(({username}) => current
         .url(`https://github.com/${username}`)
         .click('//*[@id="js-pjax-container"]/div/div/div[2]/div[1]/div/span/span[1]/form/button')
    );
  
  vorpal
    .command('userId', 'Get profile id')
    .action(() => current
          .url('https://github.com/settings/profile')
          .getAttribute('form.is-default', 'id')
          .then(profileId => profileId.replce('profile_'))
    )

  vorpal
    .command('updateProfile <userId> <image> <location>', 'Go to current user profile')
    .action(({image, location, userId}) => current
          .url('https://github.com/settings/profile')
          .chooseFile('#upload-profile-picture', image)
          .waitForVisible('//*[@id="facebox"]/div/div/form/div[3]/button', 10000)
          .click('//*[@id="facebox"]/div/div/form/div[3]/button')
          .setValue('//*[@id="user_profile_location"]', location)
          .click(`//*[@id="profile_${userId}"]/div[2]/p/button`)
    );
};
