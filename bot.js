const botBuilder = require('claudia-bot-builder');
const fbTemplate = botBuilder.fbTemplate;
const rp = require('minimal-request-promise');


module.exports = botBuilder((request, originalApiRequest) => {
    if (request.text === 'this bot sucks') {
        return [ `You shouldn't be so mean. This is harder than it seems`,
        new fbTemplate.button('You can:')
          .addButton('visit my website to learn more', 'http://http://undead-author.surge.sh')
          .get()
      ];
    }

      if (request.text === 'this is a chill bot') {
        return [ `Thanks. I agree. I am very chill.`,
        new fbTemplate.button('You can:')
          .addButton('visit my website to learn more', 'http://http://undead-author.surge.sh')
          .get()
      ];
    }

    if (request.text === 'WILLY_BOY') {
        return [ `This functionality is not yet quite available, but will be soon`,
        new fbTemplate.button('You can:')
          .addButton('visit my website to learn more', 'http://http://undead-author.surge.sh')
          .get()
      ];
    }

    if (request.text === 'JANEY_JANE') {
        return [ `This functionality is not yet quite available, but will be soon`,
        new fbTemplate.button('You can:')
          .addButton('visit my website to learn more', 'http://http://undead-author.surge.sh')
          .get()
      ];
    }

      if (request.text.toLowerCase().startsWith('i want to talk about')) {
        return [ `That's nice that you want me to write about ${request.text.slice(21)}. Someday, when my creator programs me correctly, we will be able to.`,
        new fbTemplate.button('You can:')
          .addButton('visit my website to learn more', 'http://http://undead-author.surge.sh')
          .get()
      ];
    }

      if (request.text.toLowerCase().indexOf('about') > -1 && request.text.toLowerCase().indexOf('shakespeare')>-1) {
        var ind = request.text.indexOf('about')
        return [ `That's nice that you want Shakespeare to write about${request.text.slice(ind+5)}. Someday, when my creator programs him correctly, he will be able to.`,
        new fbTemplate.button('You can:')
          .addButton('visit my website to learn more', 'http://http://undead-author.surge.sh')
          .get()
      ];
    }


      if (request.text.toLowerCase().indexOf('about') > -1 && request.text.toLowerCase().indexOf('jane austen')>-1) {
        var ind = request.text.indexOf('about')
        return [ `That's nice that you want Jane Austen to write about${request.text.slice(ind+5)}. Someday, when my creator programs her correctly, she will be able to.`,
        new fbTemplate.button('You can:')
          .addButton('visit my website to learn more', 'http://http://undead-author.surge.sh')
          .get()
      ];
    }

      if (request.text.indexOf('about') > -1) {
        var ind = request.text.indexOf('about')
        return [ `That's nice that you want me to write about${request.text.slice(ind+5)}. Someday, when my creator programs me correctly, we will be able to.`,
        new fbTemplate.button('You can:')
          .addButton('visit my website to learn more', 'http://http://undead-author.surge.sh')
          .get()
      ];
    }


  if (!request.postback)
    return rp.get(`https://graph.facebook.com/v2.6/${request.sender}?fields=first_name&access_token=${originalApiRequest.env.facebookAccessToken}`)
      .then(response => {
        const user = JSON.parse(response.body)
        return [
          `Hello, dear ${user.first_name}. Welcome to Undead Author! Ready to read some new original writing from famous dead ppl?`,
          'Who do you want to write for you today?',
          new fbTemplate.generic()
            .addBubble(`Shakespeare`, `he's very famous and made up a lotta words`)
              .addImage('http://static.poetryfoundation.org/o/harriet/2013/07/shakespeare.png')
              .addButton('I want WillyBoy to write me stuff', 'WILLY_BOY')
              .addButton('some more info bout willy', 'http://www.william-shakespeare.info/')
            .addBubble(`Jane Austen`, 'cared a lot about marriage and how it was hard to do')
              .addImage('https://www.themarysue.com/wp-content/uploads/2017/03/jane_austen_portrait.jpg')
              .addButton('I want JaneyJane to write me', 'JANEY_JANE')
              .addButton('here is her wikipedia page', 'https://en.wikipedia.org/wiki/Jane_Austen')
              .addButton('here is her society', 'http://www.jasna.org/austen/')
            .addBubble('Help & info', 'what is this weird place')
              .addImage('https://culturedvultures.com/wp-content/uploads/2014/09/ghostwriter.jpg')
              .addButton('About the bot', 'http://undead-author.surge.sh')
            .get()
        ];
      });
})
