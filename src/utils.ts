import Swal, {SweetAlertOptions} from 'sweetalert2';

export class Utils {

  static languages: Array<any> = [
    {
      code: 'en',
      name: 'English',
      flag: 'assets/images/flags/en.svg'
    },
    {
      code: 'nl',
      name: 'Dutch',
      flag: 'assets/images/flags/nl.svg'
    }
  ];

  static formatCurrency(amount: number, currency: string) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);
  }

//   static formatDate(date: Date, format: string = 'YYYY-MM-DD') {
//     return moment(date).format(format);
//   }

//   static empty(str) {
//     return !str || str === 'null' || str === '';
//   }

  static swalConfig(): SweetAlertOptions {
    return {
      title: "Delete Record",
      text: "Are you sure you want to delete this record?",
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel"
    };
  }

  static updateConfig(): SweetAlertOptions {
    return {
      title: "Approve Bid",
      text: "Are you sure you want to approve this bid?",
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel"
    };
  }

  static removeCategory(): SweetAlertOptions {
    return {
      title: "Remove Category",
      text: "Are you sure you want to remove this mapped category?",
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel"
    };
  }

  static enableUser(): SweetAlertOptions {
    return {
      title: "Update Status",
      text: "Are you sure you want to change this record status?",
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonText: "Confirm",
      cancelButtonText: "Cancel"
    };
  }


//   static disableUser(): SweetAlertOptions {
//     return {
//       title: "Update Status",
//       text: "Are you sure you want to change this user status?",
//       icon: 'warning',
//       input: 'text',
//       showCancelButton: true,
//       focusCancel: true,
//       confirmButtonText: "Confirm",
//       cancelButtonText: "Cancel",
//       inputValidator: (value) => {
//         return !value && 'You need to add reason!'
//       }

//       }
//     };


  static showSwalLoader() {
    Swal.fire({
      title: '',
      text: 'Please wait...',
      showConfirmButton: false,
      backdrop: true
    });
  }

  static closeSwalLoader() {
    Swal.close();
  }

//   static getError(errors) {
//     let message = '';
//     if (errors) {
//       const errorKey = Object.keys(errors)[0];
//       switch (errorKey) {
//         case 'invalidMimeType':
//           message = 'The attachments must be a file of type: jpeg, jpg, bmp, png';
//           break;
//       }
//     }
//     return message;
//   }

  // Format roles
//   static formatRoles(roles: Array<RoleModel>) {
//     let formattedRoles = '';
//     if (!roles || roles.length === 0) {
//       return formattedRoles;
//     }
//     roles.forEach(role => {
//       formattedRoles += `<label class="badge badge-info">${role.name}</label>`;
//     });
//     return formattedRoles;
//   }
  // Generate avatar
//   static generateAvatar(user: UserModel) {
//     if (user) {
//       if (user.avatar) {
//         return `<img class="avatar" src="${environment.fileBaseUrl}${user.avatar}" alt=""/>`;
//       }
//       const avatar = user.firstName.substr(0, 1).toUpperCase() + user.lastName.substr(0, 1).toUpperCase();
//       return `<span class="avatar">${avatar}</span>`;
//     }
//     return '';
//   }
}
