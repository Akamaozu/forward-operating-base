module.exports = {	

    bin: {
        src: 'src/client/index.html', 
        dest: 'bin/client/index.html',

        options: {
            
            styles: {
                reset: ['temp/client/css/reset.min.css'],
                bundle: ['temp/client/css/bundle.min.css'],
                main: ['temp/client/css/main.min.css']
            }
        }
    }
}