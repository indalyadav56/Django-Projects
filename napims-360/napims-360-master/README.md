## NAPIMS 360
IMS Application


## System Requirements

- [Node 14.x LTS](https://nodejs.org/en/blog/release/v14.17.3/)
- [Yarn 1.x](https://yarnpkg.com/)
- [python 3.x](https://www.python.org/downloads/)
- [pip](https://pip.pypa.io/en/stable/installing/)
- [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html) or if you are sure your python package has
`venv` then you can skip this package

### Local Development Setup

1. Clone the repository

```bash
git clone git@github.com:RightClickITSolutions/napims-360.git
```

2. Install all UI Client dependencies

```bash
yarn install --no-lockfile --production=false --silent
```

3. Setup Python virtual env
```bash
python3 -m venv .venv
```

4. Activate env
```bash
source .venv/bin/activate
```

5. Install all Server dependencies
```bash
pip install -r conf/requirements-dev.txt
```

6. Create env file and update the details
```bash
cp env.sample .env
```

6. source the `env` file
```bash
source .env
```


8. Start the Application
```bash
yarn start
```
