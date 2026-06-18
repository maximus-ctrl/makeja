import { type FormEvent, useState } from 'react';
import { Phone, ShieldCheck, WalletCards } from 'lucide-react';
import { api } from '../../lib/apiClient';
import { features } from '../../config/features';

export function MpesaCheckoutPage() {
  const [phone, setPhone] = useState('07');
  const [amount, setAmount] = useState('100');
  const [msg, setMsg] = useState('');
  async function pay(e: FormEvent) {
    e.preventDefault();
    setMsg('Sending STK prompt...');
    try {
      const r = await api.post('/payments/mpesa/stk-push', { phone, amount: Number(amount), description: 'Makeja Payment' });
      setMsg(`STK sent. Checkout: ${r.data.transaction.checkout_request_id || 'processing'}`);
    } catch (err: any) { setMsg(err.response?.data?.message || 'Payment failed to start. Check Daraja credentials and callback URL.'); }
  }
  if (!features.mpesaStk) return <div className="container py-5"><div className="alert alert-warning">M-Pesa STK is disabled.</div></div>;
  return (
    <div className="payment-page container-fluid makeja-container py-5">
      <div className="payment-shell">
        <div className="payment-info"><WalletCards size={44} /><h1>Secure payment with M-Pesa STK.</h1><p>Only STK Push is enabled in Makeja. No card, PayPal or wallet gateway is included.</p><span><ShieldCheck size={18} /> Secrets stay in Laravel .env only</span></div>
        <div className="card payment-card"><div className="card-body p-4"><h2>M-Pesa Checkout</h2><form onSubmit={pay}><label className="form-label">M-Pesa Phone</label><div className="auth-input"><Phone size={18} /><input value={phone} onChange={e => setPhone(e.target.value)} placeholder="07XXXXXXXX" /></div><label className="form-label">Amount</label><input className="form-control mb-3" value={amount} onChange={e => setAmount(e.target.value)} /><button className="btn btn-success w-100 btn-lg">Send STK Prompt</button></form>{msg && <div className="alert alert-info mt-3">{msg}</div>}</div></div>
      </div>
    </div>
  );
}
