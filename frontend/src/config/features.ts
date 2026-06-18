export const features = {
  maps: import.meta.env.VITE_ENABLE_MAPS === 'true',
  mpesaStk: import.meta.env.VITE_ENABLE_MPESA_STK === 'true',
  subscriptions: import.meta.env.VITE_ENABLE_SUBSCRIPTIONS === 'true',
  blueTick: import.meta.env.VITE_ENABLE_BLUE_TICK === 'true',
  whatsapp: import.meta.env.VITE_ENABLE_WHATSAPP === 'true',
};
