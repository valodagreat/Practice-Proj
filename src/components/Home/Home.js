import React from 'react';
import Products from '../Products/Products';
import './Home.css'

function Home() {
    return (
        <div className='home'>
            <div className="home_container">
                <img className='home_image' src="https://res.cloudinary.com/valodagreat/image/upload/v1606835504/damn_thaesb.jpg" alt=""/>
                <div className="home_row">
                    <Products id='23456' title='Alternator' price={190.99} image='https://res.cloudinary.com/valodagreat/image/upload/v1606840013/alternator_yo08br.jpg' rating={5} />
                    <Products id='12345' title='Starter' price={222.99} image='https://res.cloudinary.com/valodagreat/image/upload/v1606849420/starter_zyk0ux.jpg' rating={4} />
                </div>
                <div className="home_row">
                    <Products id='56789' title='Spark Plug' price={7.99} image='https://res.cloudinary.com/valodagreat/image/upload/v1606850326/plug_ixzqxb.jpg' rating={4} />
                    <Products id='34567' title='Fuel Pump' price={287.99} image='https://res.cloudinary.com/valodagreat/image/upload/v1606850496/fuel_pump_jzmi5r.jpg' rating={3} />
                </div>
                <div className="home_row">
                    <Products id='111213' title='Battery' price={199.99} image='https://res.cloudinary.com/valodagreat/image/upload/v1606850960/battery_iqihzd.jpg' rating={4} />
                    <Products id='21356' title='Brake Pads' price={28.99} image='https://res.cloudinary.com/valodagreat/image/upload/v1606851175/brake-pad_zg8avv.jpg' rating={4} />
                </div>
                <div className="home_row">
                    <Products id='78910' title='Performance brake pad/Rotor kit' price={899.29} image='https://res.cloudinary.com/valodagreat/image/upload/v1606850754/rotor_kit_hbvqoc.jpg' rating={2} />

                </div>
            </div>
        </div>
    )
}

export default Home
