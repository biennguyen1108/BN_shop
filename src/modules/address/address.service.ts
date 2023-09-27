import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './entities';
import { address_user } from './entities/address_user.entity';
import { CreateAddressDto } from './dto/CreateAddress.dto';
import {UpdateAddressDto} from './dto/UpdateAddress.dto';
import { successException } from '../Exception/succesExeption';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(address_user)
    private readonly addressUserRepository: Repository<address_user>,
  ) {}

  async createAddress(userId: number, createAddressDto: CreateAddressDto): Promise<Address> {
    const address = this.addressRepository.create(createAddressDto);
    await this.addressRepository.save(address);

    // Create an entry in the address_user table
    const addressUser = new address_user();
    addressUser.userId = userId;
    addressUser.addressId = address.id;
    await this.addressUserRepository.save(addressUser);

    return address;
  }

  async updateAddress(userId: number, addressId: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    // Kiểm tra tồn tại của địa chỉ với userId và addressId
    const addressUser = await this.addressUserRepository.findOne({
      where: { userId, addressId },
    });
  
    if (!addressUser) {
      throw new NotFoundException('Address not found');
    }
  
    // Nếu địa chỉ tồn tại, tiến hành cập nhật
    const existingAddress = await this.addressRepository.findOne({
        where: { id: addressId },
      });
  
    if (!existingAddress) {
      throw new NotFoundException('Address not found');
    }
  
    // Cập nhật địa chỉ
    if (updateAddressDto.address) {
        existingAddress.address = updateAddressDto.address;
      }
      if (updateAddressDto.consignee_name) {
        existingAddress.consignee_name = updateAddressDto.consignee_name;
      }
      if (updateAddressDto.phonenumber) {
        existingAddress.phonenumber = updateAddressDto.phonenumber;
      }
      if (updateAddressDto.city) {
        existingAddress.city = updateAddressDto.city;
      }
      if (updateAddressDto.state) {
        existingAddress.state = updateAddressDto.state;
      }
      if (updateAddressDto.postal_code) {
        existingAddress.postal_code = updateAddressDto.postal_code;
      }
    
      // Lưu các thay đổi
      await this.addressRepository.save(existingAddress);
    
      return existingAddress;
  }
  
  
  
  async deleteAddress(userId: number, addressId: number): Promise<void> {
    const existingAddress = await this.addressUserRepository.findOne({
        where: { userId, addressId },
      });

    if (!existingAddress) {
      throw new NotFoundException('Address not found');
    }

    // Delete the address_user entry
    await this.addressUserRepository.delete({ userId, addressId });

    // Delete the address
    await this.addressRepository.delete(addressId);
    throw new successException('Delete Address Succesfull');

  }
}
