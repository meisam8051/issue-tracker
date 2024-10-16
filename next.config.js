// 7-54-Troubleshooting- Avatar Not Loading
/** @type {import('next').NextConfig} */

//2-If the referrerPolicy='no-referrer' doesn't work
const nextConfig = {
  //In this config object, we can specify the HTTP headers that we want to
  //set.
  //Here we add an async function called headers.
  async headers() {
    //In this function, we return an array of headers that we want to apply.
    return [
      //Each header is an object with two properties,
      {
        //with this we specify a path or a path pattern for applying a
        //bunch of headers.
        //* means zero or more parameters after / essentially with this
        //pattern represent all endpoints of our application.
        source: "/:path*",
        //Next we set headers to an array of objects.Each header should
        //have two properties, a key and a value.
        headers: [
          {
            key: "referrer-policy",
            value: "no-referre",
          },
        ],
      },
    ];
  },
};

//3-this is an advanced solution.
//Now whenever we change "this configuration file", we have to restart our 
//web server.

module.exports = nextConfig;
