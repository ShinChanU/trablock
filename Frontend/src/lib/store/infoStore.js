import axios from 'axios';
import create from 'zustand';

export const infoStore = create((set) => ({
    
    getInfo : async (id, type) => {
        var info
        switch (type) {
            case 'att': 
                info = await axios.get(`http://localhost:4000/attractionInfo/${id}`);
                set({attInfo: info.data})
                break;
            case 'cult': 
                info = await axios.get(`http://localhost:4000/cultureInfo/${id}`);
                set({cultInfo: info.data})
                break;
            case 'fest': 
                info = await axios.get(`http://localhost:4000/festivalInfo/${id}`);
                set({festInfo: info.data})
                break;
            case 'lepo': 
                info = await axios.get(`http://localhost:4000/leportsInfo/${id}`);
                set({lepoInfo: info.data})
                break;
            case 'lodge': 
                info = await axios.get(`http://localhost:4000/lodgeInfo/${id}`);
                set({lodgeInfo: info.data})
                break;
            case 'res': 
                info = await axios.get(`http://localhost:4000/restaurantInfo/${id}`);
                set({resInfo: info.data})
                break;
            default:
        }
        // const info = await axios.get(`http://localhost:4000/attractionInfo/${id}`);
        // set({attInfo: info.data})
        // console.log(info.data);
    },

    attInfo: {
        name: "test",
        address1: "",
        address2: "",
        image1: "",
        image2: "",
        tel: "",
        summary: "",
        report: "",
        parking: "",
        restDate: "",
        useTime: ""
    },
    cultInfo: {
        name: "test",
        address1: "",
        address2: "",
        image1: "",
        image2: "",
        tel: "",
        summary: "",
        report: "",
        parking: "",
        restDate: "",
        fee: "",
        useTime: "",
        spendTime: ""
    },
    festInfo: {
        name: "test",
        address1: "",
        address2: "",
        image1: "",
        image2: "",
        tel: "",
        summary: "",
        report: "",
        endDate: "",
        homepage: "",
        place: "",
        startDate: "",
        placeInfo: "",
        playTime: "",
        programe: "",
        fee: "",
    },
    lepoInfo: {
        name: "test",
        address1: "",
        address2: "",
        image1: "",
        image2: "",
        tel: "",
        summary: "",
        report: "",
        openPeriod: "",
        parking: "",
        reservation: "",
        restDate: "",
        fee: "",
        useTime: ""
    },
    lodgeInfo: {
        name: "test",
        address1: "",
        address2: "",
        image1: "",
        image2: "",
        tel: "",
        summary: "",
        report: "",
        checkInTime: "",
        checkOutTime: "",
        chkCooking: "",
        parking: "",
        reservationUrl: "",
        subfacility: ""
    },
    resInfo: {
        name: "test",
        address1: "",
        address2: "",
        image1: "",
        image2: "",
        tel: "",
        summary: "",
        report: "",
        popularMenu: "",
        openTime: "",
        packing: "",
        parking: "",
        restDate: "",
        menu: ""
    },
}))