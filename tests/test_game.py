from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def start():
    return client.post('/api/game/new').json()

def avatar():
    return {'body':'arc','skin':'warm','hair':'nebula','outfit':'coat','accessory':'goggles','aura':'teal'}

def test_new_game_defaults():
    s = start()
    assert s['player']['hp'] == 150
    assert s['boss']['name'] == 'Hybridization Goblin'

def test_avatar_is_permanent():
    s = start(); sid = s['session_id']
    assert client.post('/api/avatar/finalize', params={'session_id':sid}, json=avatar()).status_code == 200
    assert client.post('/api/avatar/finalize', params={'session_id':sid}, json=avatar()).status_code == 409

def test_correct_answer_deals_damage():
    s = start(); sid = s['session_id']
    client.post('/api/avatar/finalize', params={'session_id':sid}, json=avatar())
    q = client.post('/api/battle/select-spell', params={'session_id':sid}, json={'spell_id':'fire-spark'}).json()
    answers = {
        'What does sp3 hybridization describe?':'Four equivalent hybrid orbitals',
        'A nucleophile is best described as…':'An electron-pair donor',
        'SN2 reactions are characterized by…':'Backside attack and inversion',
        'Enantiomers are molecules that are':'Non-superimposable mirror images',
        'IR spectroscopy is especially useful for identifying…':'Functional-group vibrations',
        'In a resonance hybrid, the real molecule has…':'Electron density spread across contributors',
    }
    answer = next(v for k, v in answers.items() if q['question']['prompt'].startswith(k))
    result = client.post('/api/battle/answer', params={'session_id':sid}, json={'answer':answer}).json()
    assert result['damage'] == 20


def test_favicon_endpoint_exists():
    response = client.get('/favicon.ico')
    assert response.status_code == 200
    assert response.headers['content-type'].startswith('image/')


def test_page_uses_versioned_static_assets():
    html = client.get('/').text
    assert '/static/css/game.css?v=' in html
    assert '/static/js/main.js?v=' in html
