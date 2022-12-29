const cache: {
  [key: string]: string
} = {
  '26.032550.5106': 'BH',
  '21.631939.1044': 'SA',
  '-37.8497144.968': 'AU',
  '44.343911.7167': 'IT',
  '25.9581-80.2389': 'US',
  '41.572.26111': 'ES',
  '43.73477.42056': 'MC',
  '40.372549.8533': 'AZ',
  '45.5-73.5228': 'CA',
  '52.0786-1.01694': 'GB',
  '47.219714.7647': 'AT',
  '43.25065.79167': 'FR',
  '47.578919.2486': 'HU',
  '50.43725.97139': 'BE',
  '52.38884.54092': 'NL',
  '45.61569.28111': 'IT',
  '1.2914103.864': 'SG',
  '34.8431136.541': 'JP',
  '30.1328-97.6411': 'US',
  '19.4042-99.0907': 'MX',
  '-23.7036-46.6997': 'BR',
  '24.467254.6031': 'AE',
}

export const getCountryCode = async (lat: number | null, long: number | null): Promise<string> => {
  if (!lat || !long) {
    throw new Error('Missing latitude or longitude')
  }
  const latLong = `${lat}${long}`

  if (cache[latLong]) {
    return cache[latLong]
  }

  const res = await fetch(`http://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${long}&username=ennamel`)

  if (res.ok) {
    const data = await res.json()
    cache[latLong] = data.countryCode
    return data.countryCode
  } else {
    console.log('res', res)
  }

  throw new Error('Could not find countrycode')
}
