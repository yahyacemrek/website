from flask import Flask, request, redirect, render_template, Response, url_for
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///messages.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Message(db.Model):
    id           = db.Column(db.Integer, primary_key=True)
    first_name   = db.Column(db.String(100), nullable=False)
    last_name    = db.Column(db.String(100), nullable=False)
    phone        = db.Column(db.String(20), nullable=False)
    email        = db.Column(db.String(100), nullable=False)
    message      = db.Column(db.Text, nullable=False)
    submitted_at = db.Column(db.DateTime, default=datetime.now)

# İletişim formu (hem '/' hem de 'communication.html' URL’leri bu sayfayı gösterir)
@app.route('/')
@app.route('/communication.html')
def form():
    return render_template('contact.html')

# Form verilerini kaydet ve teşekkür sayfasını göster
@app.route('/contact', methods=['POST'])
def contact():
    m = Message(
        first_name=request.form['first_name'].strip(),
        last_name =request.form['last_name'].strip(),
        phone     =request.form['phone'].strip(),
        email     =request.form['email'].strip(),
        message   =request.form['message'].strip()
    )
    db.session.add(m)
    db.session.commit()
    return render_template('thank_you.html')

# Teşekkür sayfası (isteğe bağlı ayrı route)
@app.route('/thank_you.html')
def thank_you():
    return render_template('thank_you.html')

# Diğer statik sayfalar için route’lar
@app.route('/home_page.html')
def home_page():
    return render_template('home_page.html')

@app.route('/photos.html')
def photos():
    return render_template('photos.html')

@app.route('/products.html')
def products():
    return render_template('products.html')

@app.route('/referances.html')
def referances():
    return render_template('referances.html')

# Admin paneli: mesajları listele
def check_auth(username, password):
    return username == 'admin' and password == 'sifre123'

def authenticate():
    # realm içinde yalnızca Latin-1 karakterleri (ASCII) kullanıyoruz
    return Response(
        'Giriş gerekli', 401,
        {'WWW-Authenticate':'Basic realm="Admin"'}
    )

@app.route('/admin/messages')
def admin_messages():
    auth = request.authorization
    if not auth or not check_auth(auth.username, auth.password):
        return authenticate()

    rows = Message.query.order_by(Message.submitted_at.desc()).all()
    html = ['<!DOCTYPE html><html><head><meta charset="utf-8"><title>Gelen Mesajlar</title></head><body>']
    html.append('<h1>Gelen Mesajlar</h1><table border="1" cellpadding="5"><tr>'
                '<th>#</th><th>Ad Soyad</th><th>Telefon</th><th>E-posta</th><th>Mesaj</th><th>Tarih</th></tr>')
    for r in rows:
        html.append(f'<tr><td>{r.id}</td>'
                    f'<td>{r.first_name} {r.last_name}</td>'
                    f'<td>{r.phone}</td>'
                    f'<td>{r.email}</td>'
                    f'<td>{r.message.replace(chr(10), "<br>")}</td>'
                    f'<td>{r.submitted_at}</td></tr>')
    html.append('</table></body></html>')
    return ''.join(html)

if __name__ == '__main__':
    # Uygulama bağlamı içinde SQLite tablo(lar)ını oluştur
    with app.app_context():
        db.create_all()
    # Geliştirme sunucusunu başlat
    app.run(debug=True)
