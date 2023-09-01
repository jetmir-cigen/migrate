import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthUser } from '../auth/auth-user.decorator';
import { DepartmentService } from '../department/department.service';
import {
  FindActiveNumbersByFilterQuery,
  FindGroupNumbersByFilterQuery,
  FindPhoneBooksByFilterQuery,
  FindPhoneGroupByFilterQuery,
  FindPhoneGroupNumbersByFilterQuery,
  FindPhoneGroupsByFilterQuery,
  GetSMSLogsByBatchFilterQuery,
  GetSMSLogsByFilterQuery,
} from './queries';
import {
  AddNumbersToPhoneGroupCommand,
  CreatePhoneGroupCommand,
  DeleteNumberFromPhoneGroupCommand,
  DeletePhoneGroupCommand,
  SendSMSCommand,
  UpdatePhoneGroupCommand,
} from './commands';
import { SendSmsDto } from './dto/send-sms.dto';
import { SMSLogsListResponseDto } from './dto/sms-logs-response.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { UserRoleGuard } from '../user/user-role.guard';
import { AddNumbersToPhoneBookCommand } from './commands/phone-book-add-numbers.command';
import { FindAllActiveNumbersByFilterQuery } from './queries/get-all-active-numbers.query';
import { UpdatePhoneBookNumberCommand } from './commands/phone-book-update-numbers.command';
import { UpdatePhoneGroupNumberCommand } from './commands/phone-groups-update-numbers.command';
import { ADMIN_USERS } from '../user/user-groups';

@ApiTags('Phone')
@ApiBearerAuth()
@UseGuards(AuthGuard, UserRoleGuard(ADMIN_USERS))
@Controller('phone')
export class PhoneController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly departmentService: DepartmentService,
  ) {}

  @ApiOperation({ summary: 'Get all active numbers' })
  @Get('/numbers')
  getActiveNumbers(@AuthUser() user: Express.User) {
    return this.queryBus.execute(
      new FindAllActiveNumbersByFilterQuery({
        userId: user.uid,
      }),
    );
  }

  @ApiOperation({ summary: 'Get all group active numbers' })
  @Get('/group-numbers')
  getActiveGroupNumbers(@AuthUser() user: Express.User) {
    return this.queryBus.execute(
      new FindGroupNumbersByFilterQuery({
        userId: user.uid,
      }),
    );
  }

  @ApiOperation({ summary: 'Get all phone books' })
  @Get('books')
  async getPhoneBooks(@AuthUser() user: Express.User) {
    return this.queryBus.execute(
      new FindPhoneBooksByFilterQuery({
        user,
      }),
    );
  }

  @ApiOperation({ summary: 'Add numbers to phone book' })
  @Post('books')
  async addNumbersToPhoneBook(
    @AuthUser() user: Express.User,
    @Body() body: any,
  ) {
    return this.commandBus.execute(
      new AddNumbersToPhoneBookCommand(user, body.numbers),
    );
  }

  @ApiOperation({ summary: 'Update phone book number' })
  @Post('books/:id(\\d+)')
  async updatePhoneBookNumber(
    @AuthUser() user: Express.User,
    @Body() body: any,
    @Param('id') id: number,
  ) {
    return this.commandBus.execute(
      new UpdatePhoneBookNumberCommand(user, id, body),
    );
  }

  @ApiOperation({ summary: 'Get all phone groups' })
  @Get('/groups')
  getGroups(@AuthUser() user: Express.User) {
    return this.queryBus.execute(
      new FindPhoneGroupsByFilterQuery({
        userId: user.uid,
      }),
    );
  }

  @ApiOperation({ summary: 'Get phone group' })
  @Get('/groups/:id(\\d+)')
  getGroup(@AuthUser() user: Express.User, @Param('id') id: number) {
    return this.queryBus.execute(
      new FindPhoneGroupByFilterQuery({
        userId: user.uid,
        id,
      }),
    );
  }

  @ApiOperation({ summary: 'Create phone group' })
  @Post('/groups')
  createGroup(@AuthUser() user: Express.User, @Body() body: any) {
    return this.commandBus.execute(
      new CreatePhoneGroupCommand({
        ...body,
        userId: user.uid,
        customerId: user.cid,
      }),
    );
  }

  @ApiOperation({ summary: 'Update phone group' })
  @Patch('/groups/:id(\\d+)')
  async updateGroup(
    @AuthUser() user: Express.User,
    @Body() body: any,
    @Param('id') id: number,
  ) {
    const group = await this.queryBus.execute(
      new FindPhoneGroupByFilterQuery({
        userId: user.uid,
        id,
      }),
    );

    return this.commandBus.execute(
      new UpdatePhoneGroupCommand(group, {
        ...body,
        userId: user.uid,
        customerId: user.cid,
      }),
    );
  }

  @ApiOperation({ summary: 'Delete phone group' })
  @Delete('/groups/:id(\\d+)')
  async deleteGroup(@AuthUser() user: Express.User, @Param('id') id: number) {
    const group = await this.queryBus.execute(
      new FindPhoneGroupByFilterQuery({
        userId: user.uid,
        id,
      }),
    );

    return this.commandBus.execute(new DeletePhoneGroupCommand(group));
  }

  @ApiOperation({ summary: 'Get phone group numbers' })
  @Get('/groups/:id(\\d+)/numbers')
  getGroupNumbers(@AuthUser() user: Express.User, @Param('id') id: number) {
    return this.queryBus.execute(
      new FindPhoneGroupNumbersByFilterQuery({
        userId: user.uid,
        id,
      }),
    );
  }

  @ApiOperation({ summary: 'Add phone group numbers' })
  @Post('/groups/:id(\\d+)/numbers')
  async addNumbersToGroup(
    @AuthUser() user: Express.User,
    @Param('id') id: number,
    @Body() body: any,
  ) {
    console.log({ body, id });

    return this.commandBus.execute(
      new AddNumbersToPhoneGroupCommand(user, id, body.numbers),
    );
  }

  @ApiOperation({ summary: 'Update phone group number' })
  @Post('/groups/:groupId(\\d+)/numbers/:numberId(\\d+)')
  async updatePhoneGroupNumber(
    @AuthUser() user: Express.User,
    @Body() body: any,
    @Param('groupId') id: number,
    @Param('numberId') numberId: number,
  ) {
    return this.commandBus.execute(
      new UpdatePhoneGroupNumberCommand(user, id, numberId, body),
    );
  }

  @ApiOperation({ summary: 'Delete phone group numbers' })
  @Delete('/groups/:id(\\d+)/numbers/:numberId(\\d+)')
  async deleteNumberFromGroup(
    @AuthUser() user: Express.User,
    @Param('id') id: number,
    @Param('numberId') numberId: number,
  ) {
    return this.commandBus.execute(
      new DeleteNumberFromPhoneGroupCommand(user, id, numberId),
    );
  }

  @ApiOperation({ summary: 'Send SMS to selected numbers' })
  @Post('/send-sms')
  async sendSMS(@AuthUser() user: Express.User, @Body() body: SendSmsDto) {
    return this.commandBus.execute(
      new SendSMSCommand({
        ...body,
        user,
      }),
    );
  }

  @ApiOperation({ summary: 'Get sms logs' })
  @Get('/sms-logs')
  async getSMSLogs(@AuthUser() user: Express.User) {
    const smsLogs = await this.queryBus.execute(
      new GetSMSLogsByFilterQuery({ user }),
    );

    return new SMSLogsListResponseDto({ smsLogs });
  }

  @ApiOperation({ summary: 'Get sms logs by batch' })
  @Get('/sms-logs/:batchId')
  async getSMSLogsByBatch(
    @AuthUser() user: Express.User,
    @Param('batchId') batchId: string,
  ) {
    const smsLogs = await this.queryBus.execute(
      new GetSMSLogsByBatchFilterQuery({ user, batchId }),
    );

    return new SMSLogsListResponseDto({ smsLogs });
  }
}
