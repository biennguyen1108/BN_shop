import { Controller, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AddressService } from './address.service';
import { Address } from './entities';
import { AuthGuard } from '../guards/auth.guard';
import { CreateAddressDto } from './dto/CreateAddress.dto';
import { UpdateAddressDto } from './dto/UpdateAddress.dto';

@Controller('addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @UseGuards(AuthGuard)
  @Post(':userId')
  async createAddress(
    @Param('userId') userId: number,
    @Body() createAddressDto: CreateAddressDto,
  ): Promise<Address> {
    return this.addressService.createAddress(userId, createAddressDto);
  }

  @UseGuards(AuthGuard)
  @Put(':userId/:addressId')
    async updateAddress(
  @Param('userId') userId: number,
  @Param('addressId') addressId: number,
  @Body() updateAddressDto: UpdateAddressDto,
): Promise<Address> {
  return this.addressService.updateAddress(userId, addressId, updateAddressDto);
}

  @UseGuards(AuthGuard)
  @Delete(':userId/:addressId')
  async deleteAddress(@Param('userId') userId: number, @Param('addressId') addressId: number): Promise<void> {
    return this.addressService.deleteAddress(userId, addressId);
  }
}
