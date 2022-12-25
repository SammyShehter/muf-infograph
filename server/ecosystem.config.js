module.exports = {
    apps: [
        {
            name: 'muf-server',
            script: 'server/types.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 4000,
            },
        },
    ],
    deploy: {
        production: {
            user: 'sammy',
            host: 'sammyshehter.com',
            key: '/home/sammy/.ssh/sammyshehter.com',
            ref: 'origin/main',
            repo: 'git@github.com:Muf-infograph.git',
            path: '/var/www/Muf-infograph/',
            'post-deploy':
                'npm install --production && pm2 reload ecosystem.config.js --env production',
        },
    },
}
